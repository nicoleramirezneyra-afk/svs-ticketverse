-- TicketVerse · Script de Base de Datos para PostgreSQL
-- 1. Crear base de datos (ejecutar por separado si es necesario):
-- CREATE DATABASE ticketverse;

DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS usuarios CASCADE;

-- Tabla de Usuarios
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  rol VARCHAR(20) NOT NULL DEFAULT 'alumno' -- alumno, docente, tecnico
);

-- Tabla de Categorías
CREATE TABLE categorias (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL UNIQUE
);

-- Tabla de Tickets (Incidentes)
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  categoria_id INTEGER NOT NULL REFERENCES categorias(id) ON DELETE CASCADE,
  descripcion TEXT NOT NULL,
  prioridad VARCHAR(10) NOT NULL, -- Alta, Media, Baja
  estado VARCHAR(12) NOT NULL DEFAULT 'Abierto', -- Abierto, Resuelto
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resuelto_en TIMESTAMP
);

-- Datos iniciales de prueba
INSERT INTO usuarios (nombre, rol) VALUES 
  ('Lucía', 'alumno'),
  ('Marco', 'docente'),
  ('Andre', 'alumno'),
  ('Carlos Mendoza', 'docente'),
  ('Valentina Torres', 'alumno'),
  ('Sebastián Gómez', 'tecnico'),
  ('Camila Rojas', 'alumno'),
  ('Mateo Fernández', 'soporte');

INSERT INTO categorias (nombre) VALUES 
  ('Red'),
  ('Software'),
  ('Hardware'),
  ('Accesos');

INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado, creado_en, resuelto_en) VALUES
  (1, 1, 'WiFi del laboratorio sin conexión', 'Alta', 'Abierto', NOW() - INTERVAL '2 hours', NULL),
  (2, 4, 'Restablecer clave del campus virtual', 'Media', 'Resuelto', NOW() - INTERVAL '1 day', NOW() - INTERVAL '22 hours');

-- Consultas de métricas y valor del servicio (ITIL 4)
-- 1. Total por estado:
SELECT estado, COUNT(*) AS total FROM tickets GROUP BY estado;

-- 2. Incidentes por categoría:
SELECT c.nombre, COUNT(*) AS incidentes 
FROM tickets t 
JOIN categorias c ON c.id = t.categoria_id 
GROUP BY c.nombre 
ORDER BY incidentes DESC;

-- 3. Tiempo promedio de resolución en horas:
SELECT ROUND(AVG(EXTRACT(EPOCH FROM (resuelto_en - creado_en)) / 3600)::numeric, 2) AS horas_promedio 
FROM tickets 
WHERE resuelto_en IS NOT NULL;
