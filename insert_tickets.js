const { Client } = require('pg');
require('dotenv').config();

async function addTicketsForDb(dbName) {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD,
    database: dbName,
  });

  await client.connect();

  const tickets = [
    { user: 'Carlos Mendoza', cat: 'Hardware', pri: 'Alta', est: 'Abierto', desc: 'Falla en proyector interactivo del aula 302' },
    { user: 'Valentina Torres', cat: 'Accesos', pri: 'Media', est: 'Abierto', desc: 'Error al iniciar sesión en el campus virtual' },
    { user: 'Sebastián Gómez', cat: 'Red', pri: 'Baja', est: 'Resuelto', desc: 'Mantenimiento y configuración de switches del laboratorio' },
    { user: 'Camila Rojas', cat: 'Software', pri: 'Media', est: 'Abierto', desc: 'Renovación de licencia para software de estadística' },
    { user: 'Mateo Fernández', cat: 'Software', pri: 'Baja', est: 'Resuelto', desc: 'Actualización de parches de seguridad en sala docente' },
  ];

  for (const t of tickets) {
    // Buscar usuario
    const uRes = await client.query('SELECT id FROM usuarios WHERE nombre = $1', [t.user]);
    // Buscar categoría
    const cRes = await client.query('SELECT id FROM categorias WHERE nombre = $1', [t.cat]);

    if (uRes.rows.length > 0 && cRes.rows.length > 0) {
      const uId = uRes.rows[0].id;
      const cId = cRes.rows[0].id;

      await client.query(
        `INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado, creado_en, resuelto_en)
         VALUES ($1, $2, $3, $4, $5, NOW(), $6)`,
        [uId, cId, t.desc, t.pri, t.est, t.est === 'Resuelto' ? new Date() : null]
      );
    }
  }

  console.log(`✅ Tickets insertados en ${dbName}`);
  await client.end();
}

async function run() {
  await addTicketsForDb('ticketverse');
  await addTicketsForDb('postgres');
}

run().catch(e => console.error(e));
