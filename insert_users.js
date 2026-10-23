const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'ticketverse',
});

async function run() {
  await client.connect();

  const newUsers = [
    { nombre: 'Carlos Mendoza', rol: 'docente' },
    { nombre: 'Valentina Torres', rol: 'alumno' },
    { nombre: 'Sebastián Gómez', rol: 'tecnico' },
    { nombre: 'Camila Rojas', rol: 'alumno' },
    { nombre: 'Mateo Fernández', rol: 'soporte' },
  ];

  for (const u of newUsers) {
    await client.query('INSERT INTO usuarios (nombre, rol) VALUES ($1, $2)', [u.nombre, u.rol]);
    console.log(`Usuario creado: ${u.nombre} (${u.rol})`);
  }

  const allUsers = await client.query('SELECT id, nombre, rol FROM usuarios ORDER BY id ASC');
  console.log('\n--- Lista completa de usuarios en PostgreSQL ---');
  console.table(allUsers.rows);

  await client.end();
}

run().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
