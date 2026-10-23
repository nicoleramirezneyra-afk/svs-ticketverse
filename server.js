const express = require('express');
const cors = require('cors');
const path = require('path');
const { Pool, Client } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// Asegurar que la base de datos existe
async function ensureDatabase() {
  const dbName = process.env.DB_NAME || 'ticketverse';
  const adminClient = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: 'postgres',
  });
  try {
    await adminClient.connect();
    const checkDb = await adminClient.query('SELECT 1 FROM pg_database WHERE datname = $1', [dbName]);
    if (checkDb.rows.length === 0) {
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`📦 Base de datos "${dbName}" creada exitosamente.`);
    }
  } catch (err) {
    // Si no puede conectarse como admin, continúa con el pool directo
  } finally {
    try { await adminClient.end(); } catch (e) {}
  }
}

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ticketverse',
});

// Inicializar tablas automáticamente si no existen
async function initDB() {
  await ensureDatabase();
  try {
    const client = await pool.connect();
    console.log('✅ Conexión exitosa a PostgreSQL (base ' + (process.env.DB_NAME || 'ticketverse') + ')');

    await client.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(80) NOT NULL,
        rol VARCHAR(20) NOT NULL DEFAULT 'alumno'
      );
      CREATE TABLE IF NOT EXISTS categorias (
        id SERIAL PRIMARY KEY,
        nombre VARCHAR(40) NOT NULL UNIQUE
      );
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
        categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
        descripcion TEXT NOT NULL,
        prioridad VARCHAR(10) NOT NULL,
        estado VARCHAR(12) NOT NULL DEFAULT 'Abierto',
        creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        resuelto_en TIMESTAMP
      );
    `);

    // Categorías por defecto
    await client.query(`
      INSERT INTO categorias (nombre) VALUES ('Red'), ('Software'), ('Hardware'), ('Accesos')
      ON CONFLICT (nombre) DO NOTHING;
    `);

    // Si no hay tickets, insertar los iniciales
    const countRes = await client.query('SELECT COUNT(*) FROM tickets');
    if (parseInt(countRes.rows[0].count, 10) === 0) {
      await client.query(`
        INSERT INTO usuarios (nombre, rol) VALUES ('Lucía', 'alumno'), ('Marco', 'docente'), ('Andre', 'alumno')
        ON CONFLICT DO NOTHING;
      `);
      await client.query(`
        INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado, creado_en)
        SELECT u.id, c.id, 'WiFi del laboratorio sin conexión', 'Alta', 'Abierto', NOW()
        FROM usuarios u, categorias c
        WHERE u.nombre = 'Lucía' AND c.nombre = 'Red'
        LIMIT 1;
      `);
      await client.query(`
        INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado, creado_en, resuelto_en)
        SELECT u.id, c.id, 'Restablecer clave del campus virtual', 'Media', 'Resuelto', NOW() - INTERVAL '2 hours', NOW()
        FROM usuarios u, categorias c
        WHERE u.nombre = 'Marco' AND c.nombre = 'Accesos'
        LIMIT 1;
      `);
      console.log('📌 Datos iniciales insertados en PostgreSQL.');
    }

    client.release();
  } catch (err) {
    console.warn('⚠️ No se pudo conectar a PostgreSQL todavía:', err.message);
    console.warn('Verifica tus credenciales en el archivo .env');
  }
}

initDB();

// Endpoints de la API
// 0. Obtener lista de usuarios
app.get('/api/usuarios', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre, rol FROM usuarios ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar usuarios: ' + err.message });
  }
});

// Registrar nuevo usuario
app.post('/api/usuarios', async (req, res) => {
  const { nombre, rol } = req.body;
  if (!nombre || !nombre.trim()) {
    return res.status(400).json({ error: 'El nombre es obligatorio' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO usuarios (nombre, rol) VALUES ($1, $2) RETURNING id, nombre, rol',
      [nombre.trim(), rol || 'alumno']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar usuario: ' + err.message });
  }
});

// Obtener categorías
app.get('/api/categorias', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nombre FROM categorias ORDER BY nombre ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar categorías: ' + err.message });
  }
});

// 1. Obtener todos los tickets
app.get('/api/tickets', async (req, res) => {
  try {
    const query = `
      SELECT 
        t.id, 
        u.nombre AS user, 
        u.rol AS user_rol,
        c.nombre AS cat, 
        t.prioridad AS pri, 
        t.estado AS est, 
        t.descripcion AS "desc",
        t.creado_en,
        t.resuelto_en
      FROM tickets t
      JOIN usuarios u ON u.id = t.usuario_id
      JOIN categorias c ON c.id = t.categoria_id
      ORDER BY t.id DESC;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar tickets en PostgreSQL: ' + err.message });
  }
});

// 2. Registrar nuevo ticket
app.post('/api/tickets', async (req, res) => {
  const { user, cat, pri, desc } = req.body;
  if (!desc || !desc.trim()) {
    return res.status(400).json({ error: 'La descripción es obligatoria' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Buscar o insertar usuario
    const userName = (user && user.trim()) || 'Anónimo';
    let userRes = await client.query('SELECT id, rol FROM usuarios WHERE LOWER(nombre) = LOWER($1) LIMIT 1', [userName]);
    let userId;
    let userRol = 'alumno';
    if (userRes.rows.length === 0) {
      const insUser = await client.query('INSERT INTO usuarios (nombre, rol) VALUES ($1, $2) RETURNING id, rol', [userName, 'alumno']);
      userId = insUser.rows[0].id;
      userRol = insUser.rows[0].rol;
    } else {
      userId = userRes.rows[0].id;
      userRol = userRes.rows[0].rol;
    }

    // Buscar o insertar categoría
    const catName = cat || 'General';
    let catRes = await client.query('SELECT id FROM categorias WHERE LOWER(nombre) = LOWER($1) LIMIT 1', [catName]);
    let catId;
    if (catRes.rows.length === 0) {
      const insCat = await client.query('INSERT INTO categorias (nombre) VALUES ($1) RETURNING id', [catName]);
      catId = insCat.rows[0].id;
    } else {
      catId = catRes.rows[0].id;
    }

    // Insertar ticket
    const ticketRes = await client.query(
      `INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado, creado_en)
       VALUES ($1, $2, $3, $4, 'Abierto', NOW())
       RETURNING id, prioridad AS pri, estado AS est, descripcion AS "desc", creado_en, resuelto_en`,
      [userId, catId, desc.trim(), pri || 'Media']
    );

    await client.query('COMMIT');

    const newTicket = {
      id: ticketRes.rows[0].id,
      user: userName,
      user_rol: userRol,
      cat: catName,
      pri: ticketRes.rows[0].pri,
      est: ticketRes.rows[0].est,
      desc: ticketRes.rows[0].desc,
      creado_en: ticketRes.rows[0].creado_en,
      resuelto_en: ticketRes.rows[0].resuelto_en,
    };

    res.status(201).json(newTicket);
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Error al guardar el ticket: ' + err.message });
  } finally {
    client.release();
  }
});

// 3. Resolver ticket
app.put('/api/tickets/:id/resolver', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  try {
    const result = await pool.query(
      `UPDATE tickets 
       SET estado = 'Resuelto', resuelto_en = NOW() 
       WHERE id = $1 RETURNING id, estado, resuelto_en`,
      [ticketId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ success: true, message: `Ticket #${ticketId} resuelto`, ticket: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error al resolver el ticket: ' + err.message });
  }
});

// Actualizar estado general del ticket (Abierto, En Proceso, Resuelto)
app.put('/api/tickets/:id/estado', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  const { estado } = req.body;
  if (!['Abierto', 'En Proceso', 'Resuelto'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido. Debe ser Abierto, En Proceso o Resuelto' });
  }
  try {
    const resueltoEn = estado === 'Resuelto' ? 'NOW()' : 'NULL';
    const result = await pool.query(
      `UPDATE tickets 
       SET estado = $1, resuelto_en = ${resueltoEn} 
       WHERE id = $2 RETURNING id, estado, resuelto_en`,
      [estado, ticketId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ success: true, message: `Ticket #${ticketId} actualizado a ${estado}`, ticket: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar estado: ' + err.message });
  }
});

// Eliminar ticket
app.delete('/api/tickets/:id', async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);
  try {
    const result = await pool.query('DELETE FROM tickets WHERE id = $1 RETURNING id', [ticketId]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ticket no encontrado' });
    }
    res.json({ success: true, message: `Ticket #${ticketId} eliminado` });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar ticket: ' + err.message });
  }
});

// 4. Métricas ITIL de Valor del Servicio
app.get('/api/metricas', async (req, res) => {
  try {
    const statsRes = await pool.query(`
      SELECT
        COUNT(*) AS total,
        COUNT(*) FILTER (WHERE estado = 'Abierto') AS abiertos,
        COUNT(*) FILTER (WHERE estado = 'En Proceso') AS en_proceso,
        COUNT(*) FILTER (WHERE estado = 'Resuelto') AS resueltos,
        COUNT(*) FILTER (WHERE prioridad = 'Alta' AND estado != 'Resuelto') AS alta_urgencia,
        ROUND(COALESCE(AVG(EXTRACT(EPOCH FROM (resuelto_en - creado_en)) / 3600) FILTER (WHERE resuelto_en IS NOT NULL), 0)::numeric, 1) AS tiempo_promedio_horas
      FROM tickets;
    `);

    const catRes = await pool.query(`
      SELECT c.nombre AS categoria, COUNT(t.id) AS total
      FROM categorias c
      LEFT JOIN tickets t ON t.categoria_id = c.id
      GROUP BY c.nombre
      ORDER BY total DESC;
    `);

    res.json({
      resumen: statsRes.rows[0],
      categorias: catRes.rows
    });
  } catch (err) {
    res.status(500).json({ error: 'Error al calcular métricas: ' + err.message });
  }
});

// 5. Estado de salud / conexión
app.get('/api/status', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ connected: true, db: 'PostgreSQL' });
  } catch (err) {
    res.status(500).json({ connected: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📊 Panel TicketVerse conectado con PostgreSQL`);
});

// También escuchar en el puerto 8000 para que funcione si el usuario tiene localhost:8000 abierto
const ALT_PORT = 8000;
if (parseInt(PORT, 10) !== ALT_PORT) {
  try {
    app.listen(ALT_PORT, () => {
      console.log(`🚀 Servidor también disponible en http://localhost:${ALT_PORT}`);
    });
  } catch (e) {
    console.log('Puerto 8000 ocupado o no disponible.');
  }
}
