-- TicketVerse · Base de datos del Caso 1 (compatible con SQLite / MySQL con ajustes mínimos)
CREATE TABLE usuarios (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  rol VARCHAR(20) NOT NULL            -- alumno, docente, tecnico
);
CREATE TABLE categorias (
  id INTEGER PRIMARY KEY,
  nombre VARCHAR(40) NOT NULL
);
CREATE TABLE tickets (
  id INTEGER PRIMARY KEY,
  usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
  categoria_id INTEGER NOT NULL REFERENCES categorias(id),
  descripcion TEXT NOT NULL,
  prioridad VARCHAR(10) NOT NULL,     -- Alta, Media, Baja
  estado VARCHAR(12) NOT NULL DEFAULT 'Abierto',
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resuelto_en TIMESTAMP
);

INSERT INTO usuarios (id, nombre, rol) VALUES (1,'Lucía','alumno'),(2,'Marco','docente'),(3,'Andre','alumno');
INSERT INTO categorias (id, nombre) VALUES (1,'Red'),(2,'Software'),(3,'Hardware'),(4,'Accesos');
INSERT INTO tickets (usuario_id, categoria_id, descripcion, prioridad, estado) VALUES
 (1,1,'WiFi del laboratorio sin conexión','Alta','Abierto'),
 (2,4,'Restablecer clave del campus virtual','Media','Resuelto');

-- Consultas que muestran el valor del servicio
SELECT estado, COUNT(*) AS total FROM tickets GROUP BY estado;
SELECT c.nombre, COUNT(*) AS incidentes FROM tickets t JOIN categorias c ON c.id = t.categoria_id GROUP BY c.nombre ORDER BY incidentes DESC;
SELECT AVG(julianday(resuelto_en) - julianday(creado_en)) * 24 AS horas_promedio FROM tickets WHERE resuelto_en IS NOT NULL;