# 🕸️ SVS Lab · ITIL 4 Command Center & TicketVerse

> **Sistema de Valor del Servicio (SVS) - Gestión de Tecnologías de la Información (TIC)**  
> Plataforma interactiva para la co-creación de valor, mesa de ayuda con base de datos relacional PostgreSQL, análisis comparativo de componentes de ITIL 4 y mapas conceptuales dinámicos asistidos por **Spidey-IA**.

---

## 🚀 Características Principales

### 🎫 Caso 1: TicketVerse (Mesa de Ayuda de Incidentes)
- Conexión en tiempo real con **PostgreSQL**.
- Gestión de estados de incidentes: `Abierto`, `En Proceso`, `Resuelto`.
- Filtros avanzados en tiempo real (por estado, categoría, prioridad y texto).
- Directorio de usuarios y asignación de roles (`alumno`, `docente`, `tecnico`, `soporte`).
- Métricas de valor del servicio ITIL 4 (tasa de resolución, distribución por categorías y cumplimiento de SLA).
- Exportación de reportes de incidentes a formato CSV.

### 📑 Caso 2: Cuadro Comparativo del SVS
- Análisis comparativo interactivo de los **5 Componentes del SVS**:
  1. **Principios Rectores**
  2. **Gobernanza**
  3. **Cadena de Valor del Servicio**
  4. **Prácticas**
  5. **Mejora Continua**
- Ficha técnica profunda (*Deep Dive*) con ejemplos reales aplicados al ámbito universitario.

### 🧠 Caso 3: Mapa Mental Interactivo
- Estructura jerárquica de conceptos clave de ITIL 4 y flujo de transformación de *Demanda ➔ Valor*.

### 🎮 Gamificación y Entrenamiento ITIL
- **Quiz ITIL 4**: Evaluación interactiva de conocimientos con retroalimentación instantánea.
- **Simulador Salva el SLA**: Dinámica de reacción rápida para contención de incidentes.

### 🕷️ Spidey-IA (Asistente Integrado)
- Comandos en lenguaje natural para consultar estado, crear tickets y explicar conceptos de ITIL 4.
- Soporte para reconocimiento y síntesis de voz mediante Web Speech API.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: HTML5 Semántico, CSS3 Moderno (Glassmorphism, Cyberpunk UI, Flexbox/Grid), JavaScript Vanilla (ES6+).
- **Backend**: Node.js, Express.js, CORS.
- **Base de Datos**: PostgreSQL (`pg` pool).
- **Diseño & Tipografía**: Google Fonts (*Chakra Petch*, *Outfit*).

---

## 📦 Instalación y Ejecución Local

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/svs-ticketverse-postgres.git
cd svs-ticketverse-postgres
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Copia el archivo `.env.example` a `.env` y configura tus credenciales de PostgreSQL:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=ticketverse
```

### 4. Inicializar la base de datos
El servidor crea automáticamente las tablas y categorías al arrancar. También puedes ejecutar el script:
```bash
psql -U postgres -d postgres -f database_postgres.sql
```

### 5. Iniciar la aplicación
```bash
npm start
```
Abre tu navegador en `http://localhost:3000` (o `http://localhost:8000`).

---

## 📄 Estructura del Proyecto

```text
├── .env.example          # Plantilla de variables de entorno
├── .gitignore            # Archivos excluidos de Git (node_modules, .env)
├── app.js                # Lógica del frontend y llamadas API
├── database_postgres.sql # Script SQL para PostgreSQL
├── index.html            # Interfaz principal de la plataforma
├── package.json          # Dependencias y scripts de Node.js
├── README.md             # Documentación del proyecto
├── server.js             # API REST con Express y conexión a PostgreSQL
└── styles.css            # Estilos y diseño visual Command Center
```
