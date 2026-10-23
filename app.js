// SVS Lab · ITIL 4 Command Center & TicketVerse
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ==========================================
   1. DATOS CONCEPTUALES (SVS & MAPA MENTAL)
   ========================================== */
const SVS = [
  [
    "Principios rectores",
    "Recomendaciones universales y perdurables que guían a la organización en cualquier circunstancia, facilitando la toma de decisiones ágil y consistente.",
    "Orientar todas las decisiones y acciones organizacionales hacia la co-creación de valor.",
    "1. Enfocarse en el valor · 2. Empezar donde se está · 3. Progresar iterativamente con retroalimentación · 4. Colaborar y promover la visibilidad · 5. Pensar y trabajar holísticamente · 6. Mantenerlo simple y práctico · 7. Optimizar y automatizar.",
    "Al recibir una queja masiva sobre el campus virtual, el equipo TI prioriza restablecer el acceso a los exámenes antes que rediseñar el portal (Enfocarse en el valor y Progresar iterativamente)."
  ],
  [
    "Gobernanza",
    "El sistema mediante el cual la organización es dirigida y controlada para asegurar que los objetivos estratégicos se cumplan con transparencia y cumplimiento.",
    "Alinear la gestión de servicios y tecnologías con la estrategia institucional y los requisitos regulatorios.",
    "Evaluación de la demanda y estrategia · Dirección a través de políticas y prioridades · Monitoreo del rendimiento, riesgos y cumplimiento.",
    "El Consejo Universitario establece la política institucional de que ninguna clase presencial puede verse interrumpida más de 15 minutos por fallas de TI."
  ],
  [
    "Cadena de valor del servicio",
    "Un modelo operativo flexible que describe las actividades clave requeridas para responder a la demanda y facilitar la creación de valor mediante productos y servicios.",
    "Transformar la demanda y oportunidades de los clientes en valor real tangible mediante 6 actividades interconectadas.",
    "Planificar · Mejorar · Involucrar (Engage) · Diseñar y transición · Obtener/construir · Entregar y dar soporte.",
    "Un estudiante reporta la caída de un proyector (Involucrar), se despacha un repuesto y se repara (Entregar y dar soporte), y se registra en la base de datos para prevenir futuras fallas (Mejorar)."
  ],
  [
    "Prácticas",
    "Conjuntos estructurados de recursos organizacionales diseñados para realizar trabajo específico o cumplir uno o varios objetivos de servicio.",
    "Dotar a la institución de capacidades técnicas y operativas para ejecutar con éxito las actividades de la cadena de valor.",
    "14 Prácticas de Gestión General · 17 Prácticas de Gestión de Servicios (ej. Mesa de servicio, Gestión de incidentes, SLAs) · 3 Prácticas de Gestión Técnica.",
    "TicketVerse actúa como la herramienta tecnológica principal de la práctica de Mesa de Servicio, registrando, priorizando y dando seguimiento formal a cada solicitud."
  ],
  [
    "Mejora continua",
    "Una actividad organizacional recurrente llevada a cabo en todos los niveles para asegurar que el rendimiento de los servicios cumpla y supere continuamente las expectativas.",
    "Mantener la relevancia, calidad, eficiencia y agilidad de los servicios ante los cambios tecnológicos y las demandas de los usuarios.",
    "Modelo de Mejora Continua: ¿Cuál es la visión? · ¿Dónde estamos ahora? · ¿Dónde queremos estar? · ¿Cómo llegamos allí? · Tomar acción · ¿Llegamos? · ¿Cómo mantenemos el impulso?",
    "El departamento de TI analiza los tiempos de resolución en PostgreSQL al final del ciclo académico y detecta que el 60% de tickets son por olvido de contraseñas; implementan un bot de autoservicio."
  ]
];

const MIND = [
  [
    "Principios rectores",
    [
      "Enfocarse en el valor: Todo lo que hace TI debe generar valor directo o indirecto para los estudiantes y docentes.",
      "Empezar donde se está: Aprovechar la infraestructura existente y no descartar sistemas que aún funcionan.",
      "Progresar iterativamente con retroalimentación: Implementar mejoras en ciclos cortos y medibles.",
      "Colaborar y promover la visibilidad: Trabajar entre áreas de TI sin silos y compartir métricas abiertamente.",
      "Pensar y trabajar holísticamente: Ningún servicio de TI opera de forma aislada de los procesos académicos.",
      "Mantenerlo simple y práctico: Usar la menor cantidad de pasos necesarios para lograr el objetivo.",
      "Optimizar y automatizar: Estandarizar procesos repetitivos (como el registro de incidentes en TicketVerse)."
    ]
  ],
  [
    "Gobernanza",
    [
      "Evaluar: Analizar las necesidades actuales del campus, tendencias tecnológicas y restricciones de presupuesto.",
      "Dirigir: Asignar responsabilidades claras, aprobar normas de seguridad y establecer Acuerdos de Nivel de Servicio (SLA).",
      "Monitorear: Medir el cumplimiento de los indicadores y reportar a las autoridades institucionales."
    ]
  ],
  [
    "Cadena de valor",
    [
      "Planificar: Asegurar el entendimiento compartido de la visión y dirección de los servicios.",
      "Mejorar: Asegurar la mejora continua de servicios y prácticas en todos los puntos de contacto.",
      "Involucrar: Comprender las necesidades de estudiantes y docentes y mantener buena relación con ellos.",
      "Diseñar y transición: Asegurar que los servicios cumplan con las expectativas de costo y calidad.",
      "Obtener / construir: Asegurar la disponibilidad de componentes de servicio (hardware, software, licencias).",
      "Entregar y dar soporte: Resolver incidentes y asegurar que los servicios operen según los acuerdos."
    ]
  ],
  [
    "Prácticas",
    [
      "Prácticas Generales: Gestión de proyectos, gestión de relaciones, gestión de proveedores, gestión de riesgos.",
      "Prácticas de Servicios: Mesa de servicio (TicketVerse), Gestión de incidentes, Gestión de solicitudes, Gestión de problemas, Gestión de niveles de servicio.",
      "Prácticas Técnicas: Gestión de despliegue, gestión de infraestructura y plataformas, desarrollo y gestión de software."
    ]
  ],
  [
    "Mejora continua",
    [
      "¿Cuál es la visión? (Alineación con la misión universitaria)",
      "¿Dónde estamos ahora? (Línea base medida en PostgreSQL)",
      "¿Dónde queremos estar? (Metas de SLA: resolver el 95% en menos de 24h)",
      "¿Cómo llegamos allí? (Plan de optimización técnica y capacitación)",
      "Tomar acción (Ejecutar mejoras)",
      "¿Llegamos? (Evaluar métricas finales)",
      "¿Cómo mantenemos el impulso? (Institucionalizar las buenas prácticas)"
    ]
  ]
];

/* ==========================================
   2. NAVEGACIÓN Y PESTAÑAS
   ========================================== */
function go(sec, tab) {
  $$('.sec').forEach(s => s.classList.toggle('show', s.id === sec));
  $$('#menu .nav-btn').forEach(b => b.classList.toggle('on', b.dataset.sec === sec));
  $('#menu')?.classList.remove('mobile-open');
  if (tab) setTab(tab);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setTab(t) {
  $$('.tab').forEach(x => x.classList.toggle('show', x.id === 'tab-' + t));
  $$('.tab-btn').forEach(b => b.classList.toggle('on', b.dataset.tab === t));
}

// Menú móvil toggle
$('#menu-toggle')?.addEventListener('click', e => {
  e.stopPropagation();
  $('#menu')?.classList.toggle('mobile-open');
});

document.addEventListener('click', e => {
  if (!e.target.closest('#menu') && !e.target.closest('#menu-toggle')) {
    $('#menu')?.classList.remove('mobile-open');
  }
});

$$('[data-sec]').forEach(b => {
  b.onclick = e => {
    e.stopPropagation();
    go(b.dataset.sec, b.dataset.tab);
  };
});

$$('[data-go]').forEach(a => {
  a.onclick = () => go(a.dataset.go);
});

$$('.tab-btn').forEach(b => {
  b.onclick = () => setTab(b.dataset.tab);
});

/* ==========================================
   3. SISTEMA DE TOAST NOTIFICATIONS
   ========================================== */
function showToast(msg, type = 'info') {
  const container = $('#toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> <div>${esc(msg)}</div>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

/* ==========================================
   4. GESTIÓN DE TICKETS & POSTGRESQL API
   ========================================== */
const STORAGE_KEY = 'ticketverse_db';
const loadLocalTickets = () => {
  try {
    const d = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (d && Array.isArray(d) && d.length) return d;
  } catch (e) {}
  return [
    { id: 1, user: 'Lucía', user_rol: 'alumno', cat: 'Red', pri: 'Alta', est: 'Abierto', desc: 'WiFi del laboratorio sin conexión', creado_en: new Date(Date.now() - 7200000).toISOString() },
    { id: 2, user: 'Marco', user_rol: 'docente', cat: 'Accesos', pri: 'Media', est: 'Resuelto', desc: 'Restablecer clave del campus virtual', creado_en: new Date(Date.now() - 86400000).toISOString(), resuelto_en: new Date().toISOString() },
    { id: 3, user: 'Andre', user_rol: 'alumno', cat: 'Software', pri: 'Baja', est: 'En Proceso', desc: 'Instalación de Visual Studio Code en equipos de laboratorio', creado_en: new Date(Date.now() - 14400000).toISOString() }
  ];
};

let tickets = loadLocalTickets();
let usuarios = [
  { id: 1, nombre: 'Lucía', rol: 'alumno' },
  { id: 2, nombre: 'Marco', rol: 'docente' },
  { id: 3, nombre: 'Andre', rol: 'alumno' },
  { id: 4, nombre: 'Carlos Mendoza', rol: 'docente' },
  { id: 5, nombre: 'Valentina Torres', rol: 'alumno' },
  { id: 6, nombre: 'Sebastián Gómez', rol: 'tecnico' },
  { id: 7, nombre: 'Camila Rojas', rol: 'alumno' },
  { id: 8, nombre: 'Mateo Fernández', rol: 'soporte' }
];

let useAPI = false;
let selectedModalTicket = null;

const saveLocal = () => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets)); } catch (e) {}
};

// Formato de fechas amigable
function timeAgo(dateString) {
  if (!dateString) return 'Reciente';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Reciente';
  const diffSec = Math.floor((new Date() - date) / 1000);
  if (diffSec < 60) return 'Hace un momento';
  if (diffSec < 3600) return `Hace ${Math.floor(diffSec / 60)} min`;
  if (diffSec < 86400) return `Hace ${Math.floor(diffSec / 3600)} h`;
  return `Hace ${Math.floor(diffSec / 86400)} d`;
}

// Renderizado de la tabla de tickets con filtros y búsqueda
function renderTickets() {
  const q = ($('#ticket-search')?.value || '').toLowerCase().trim();
  const fState = $('#filter-state')?.value || 'todos';
  const fCat = $('#filter-cat')?.value || 'todas';
  const fPri = $('#filter-pri')?.value || 'todas';

  const filtered = tickets.filter(t => {
    if (fState !== 'todos' && t.est !== fState) return false;
    if (fCat !== 'todas' && t.cat !== fCat) return false;
    if (fPri !== 'todas' && t.pri !== fPri) return false;
    if (q) {
      const matchId = ('#' + t.id).includes(q) || String(t.id) === q;
      const matchUser = (t.user || '').toLowerCase().includes(q);
      const matchDesc = (t.desc || '').toLowerCase().includes(q);
      const matchCat = (t.cat || '').toLowerCase().includes(q);
      if (!matchId && !matchUser && !matchDesc && !matchCat) return false;
    }
    return true;
  });

  // KPIs
  const total = tickets.length;
  const abiertos = tickets.filter(t => t.est === 'Abierto').length;
  const enProceso = tickets.filter(t => t.est === 'En Proceso').length;
  const resueltos = tickets.filter(t => t.est === 'Resuelto').length;
  const altaUrgencia = tickets.filter(t => t.pri === 'Alta' && t.est !== 'Resuelto').length;
  const resolutionRate = total ? Math.round((resueltos / total) * 100) : 100;

  const kpisEl = $('#kpis');
  if (kpisEl) {
    kpisEl.innerHTML = `
      <div class="kpi kpi-accent-blue"><b>${total}</b><span>Total Incidentes</span></div>
      <div class="kpi kpi-accent-amber"><b>${abiertos}</b><span>Abiertos (En Espera)</span></div>
      <div class="kpi kpi-accent-blue"><b>${enProceso}</b><span>En Proceso de TI</span></div>
      <div class="kpi kpi-accent-green"><b>${resueltos}</b><span>Resueltos (${resolutionRate}%)</span></div>
      <div class="kpi kpi-accent-red"><b>${altaUrgencia}</b><span>Alta Prioridad Activa</span></div>
    `;
  }

  // Quick stats en Hero
  const qsTotal = $('#qs-total');
  const qsOpen = $('#qs-open');
  const qsRate = $('#qs-rate');
  if (qsTotal) qsTotal.textContent = total;
  if (qsOpen) qsOpen.textContent = abiertos + enProceso;
  if (qsRate) qsRate.textContent = `${resolutionRate}%`;

  // Render Table
  const tbody = $('#tbl tbody');
  const emptyMsg = $('#no-tickets-msg');
  if (tbody) {
    if (filtered.length === 0) {
      tbody.innerHTML = '';
      if (emptyMsg) emptyMsg.style.display = 'block';
    } else {
      if (emptyMsg) emptyMsg.style.display = 'none';
      tbody.innerHTML = filtered.map(t => {
        const estClass = (t.est || 'Abierto').replace(/\s+/g, '-');
        const userInitial = (t.user || 'A').charAt(0).toUpperCase();
        return `
          <tr>
            <td><span class="ticket-pill">#${t.id}</span></td>
            <td>
              <div class="user-cell">
                <div class="user-cell-avatar">${userInitial}</div>
                <div class="user-cell-info">
                  <b>${esc(t.user)}</b>
                  <small>${esc(t.user_rol || 'alumno')}</small>
                </div>
              </div>
            </td>
            <td><b>${esc(t.cat)}</b></td>
            <td><span class="tag ${t.pri}">${t.pri}</span></td>
            <td style="max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${esc(t.desc)}">
              ${esc(t.desc)}
            </td>
            <td><span class="tag ${estClass}">${t.est}</span></td>
            <td>
              <div class="table-actions">
                <button class="act-btn" onclick="openTicketModal(${t.id})" title="Ver detalle completo">🔍 Ver</button>
                ${t.est !== 'Resuelto' ? `<button class="act-btn act-btn-resolve" onclick="resolveTicket(${t.id})">✅ Resolver</button>` : ''}
              </div>
            </td>
          </tr>
        `;
      }).join('');
    }
  }

  renderMetricsChart();
}

// Renderizado de usuarios en tabla y datalist
function renderUsers() {
  const tbody = $('#tbl-users tbody');
  if (tbody) {
    tbody.innerHTML = usuarios.map(u => `
      <tr>
        <td><b>#${u.id}</b></td>
        <td>
          <div class="user-cell">
            <div class="user-cell-avatar">${u.nombre.charAt(0).toUpperCase()}</div>
            <div class="user-cell-info"><b>${esc(u.nombre)}</b></div>
          </div>
        </td>
        <td><span class="tag ${u.rol === 'docente' ? 'Alta' : u.rol === 'tecnico' || u.rol === 'soporte' ? 'Media' : 'Baja'}">${esc(u.rol)}</span></td>
        <td>${u.rol === 'docente' ? 'Docente / Académico' : u.rol === 'tecnico' || u.rol === 'soporte' ? 'Gestor de TI & Mesa de Ayuda' : 'Estudiante'}</td>
      </tr>
    `).join('');
  }

  const pill = $('#user-count-pill');
  if (pill) pill.textContent = `${usuarios.length} usuarios registrados`;

  const dl = $('#user-datalist');
  if (dl) {
    dl.innerHTML = usuarios.map(u => `<option value="${esc(u.nombre)}">${esc(u.nombre)} (${u.rol})</option>`).join('');
  }
}

// Métricas ITIL
function renderMetricsChart() {
  const container = $('#cat-distribution-bars');
  if (!container) return;

  const catCounts = {};
  tickets.forEach(t => {
    catCounts[t.cat] = (catCounts[t.cat] || 0) + 1;
  });

  const total = tickets.length || 1;
  const cats = ['Red', 'Software', 'Hardware', 'Accesos'];

  container.innerHTML = cats.map(cat => {
    const count = catCounts[cat] || 0;
    const pct = Math.round((count / total) * 100);
    return `
      <div class="cat-bar-item">
        <div class="cat-bar-header">
          <span><b>${cat}</b> (${count} tickets)</span>
          <span>${pct}%</span>
        </div>
        <div class="bar-track">
          <div class="bar-fill" style="width: ${pct}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

// Agregar Ticket
async function addTicket(user, cat, pri, desc) {
  const trimmedDesc = (desc || '').trim();
  if (!trimmedDesc) {
    showToast('Por favor escribe la descripción del incidente', 'error');
    return null;
  }

  const trimmedUser = (user || '').trim() || 'Anónimo';
  const newLocal = {
    id: tickets.length ? Math.max(...tickets.map(x => x.id)) + 1 : 1,
    user: trimmedUser,
    user_rol: 'alumno',
    cat: cat || 'General',
    pri: pri || 'Media',
    est: 'Abierto',
    desc: trimmedDesc,
    creado_en: new Date().toISOString()
  };

  if (useAPI) {
    try {
      const res = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: trimmedUser, cat, pri, desc: trimmedDesc })
      });
      if (res.ok) {
        const savedTicket = await res.json();
        showToast(`Ticket #${savedTicket.id} guardado en PostgreSQL`, 'success');
        await loadAPI();
        return savedTicket;
      }
    } catch (e) {
      console.warn('Fallo al conectar con API POST, guardando localmente');
    }
  }

  // Fallback local
  tickets.unshift(newLocal);
  saveLocal();
  renderTickets();
  showToast(`Ticket #${newLocal.id} registrado (Modo Local)`, 'info');
  return newLocal;
}

// Resolver Ticket
async function resolveTicket(id) {
  if (useAPI) {
    try {
      const res = await fetch(`/api/tickets/${id}/resolver`, { method: 'PUT' });
      if (res.ok) {
        showToast(`Ticket #${id} marcado como Resuelto`, 'success');
        await loadAPI();
        return true;
      }
    } catch (e) {
      console.warn('Fallo al resolver en API');
    }
  }

  const t = tickets.find(x => x.id === id);
  if (!t) return false;
  t.est = 'Resuelto';
  t.resuelto_en = new Date().toISOString();
  saveLocal();
  renderTickets();
  showToast(`Ticket #${id} resuelto exitosamente`, 'success');
  return true;
}

// Cambiar estado genérico
async function changeTicketState(id, nuevoEstado) {
  if (useAPI) {
    try {
      const res = await fetch(`/api/tickets/${id}/estado`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
      });
      if (res.ok) {
        showToast(`Ticket #${id} actualizado a "${nuevoEstado}"`, 'success');
        await loadAPI();
        return true;
      }
    } catch (e) {}
  }

  const t = tickets.find(x => x.id === id);
  if (t) {
    t.est = nuevoEstado;
    if (nuevoEstado === 'Resuelto') t.resuelto_en = new Date().toISOString();
    saveLocal();
    renderTickets();
    showToast(`Ticket #${id} actualizado a ${nuevoEstado}`, 'info');
    return true;
  }
  return false;
}

// Eliminar Ticket
async function deleteTicket(id) {
  if (!confirm(`¿Estás seguro de eliminar permanentemente el ticket #${id}?`)) return;
  if (useAPI) {
    try {
      const res = await fetch(`/api/tickets/${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast(`Ticket #${id} eliminado de la base de datos`, 'info');
        await loadAPI();
        return;
      }
    } catch (e) {}
  }

  tickets = tickets.filter(x => x.id !== id);
  saveLocal();
  renderTickets();
  showToast(`Ticket #${id} eliminado`, 'info');
}

// Modal de Detalle
window.openTicketModal = function(id) {
  const t = tickets.find(x => x.id === id);
  if (!t) return;
  selectedModalTicket = t;
  $('#m-ticket-id').textContent = `#${t.id}`;
  $('#m-ticket-cat').textContent = `${t.cat} · ${t.user}`;
  $('#m-ticket-user').textContent = `${t.user} (${t.user_rol || 'Estudiante'})`;
  $('#m-ticket-pri').className = `tag ${t.pri}`;
  $('#m-ticket-pri').textContent = t.pri;
  $('#m-ticket-est').className = `tag ${(t.est || 'Abierto').replace(/\s+/g, '-')}`;
  $('#m-ticket-est').textContent = t.est;
  $('#m-ticket-date').textContent = timeAgo(t.creado_en);
  $('#m-ticket-desc').textContent = t.desc;

  $('#ticket-modal').style.display = 'grid';
};

window.closeTicketModal = function() {
  $('#ticket-modal').style.display = 'none';
  selectedModalTicket = null;
};

window.setModalTicketStatus = async function(status) {
  if (!selectedModalTicket) return;
  await changeTicketState(selectedModalTicket.id, status);
  openTicketModal(selectedModalTicket.id);
};

window.deleteModalTicket = async function() {
  if (!selectedModalTicket) return;
  const id = selectedModalTicket.id;
  closeTicketModal();
  await deleteTicket(id);
};

// Crear Usuario en PostgreSQL
async function createUser(nombre, rol) {
  const cleanName = (nombre || '').trim();
  if (!cleanName) {
    showToast('Por favor introduce el nombre del usuario', 'error');
    return;
  }

  if (useAPI) {
    try {
      const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: cleanName, rol })
      });
      if (res.ok) {
        const u = await res.json();
        showToast(`Usuario "${u.nombre}" creado en PostgreSQL exitosamente`, 'success');
        $('#u-name').value = '';
        await loadAPI();
        return;
      }
    } catch (e) {}
  }

  // Fallback local
  const newU = {
    id: usuarios.length ? Math.max(...usuarios.map(x => x.id)) + 1 : 1,
    nombre: cleanName,
    rol: rol || 'alumno'
  };
  usuarios.push(newU);
  renderUsers();
  $('#u-name').value = '';
  showToast(`Usuario "${cleanName}" añadido (Modo local)`, 'info');
}

// Carga inicial y sincronización con PostgreSQL
async function loadAPI() {
  try {
    const [rTickets, rUsers, rStatus] = await Promise.all([
      fetch('/api/tickets'),
      fetch('/api/usuarios'),
      fetch('/api/status')
    ]);

    if (!rTickets.ok) throw new Error('API tickets error');

    tickets = await rTickets.json();
    if (rUsers.ok) usuarios = await rUsers.json();

    useAPI = true;
    updateDbStatusUI(true);
    renderTickets();
    renderUsers();
  } catch (e) {
    useAPI = false;
    updateDbStatusUI(false);
    renderTickets();
    renderUsers();
  }
}

function updateDbStatusUI(connected) {
  const badge = $('#db-status-badge');
  const text = $('#db-status-text');
  const globalPill = $('#global-db-pill');
  const globalText = $('#global-db-text');

  if (connected) {
    if (badge) badge.className = 'db-badge connected';
    if (text) text.textContent = 'PostgreSQL: Conectado (BD ticketverse)';
    if (globalPill) globalPill.className = 'top-status';
    if (globalText) globalText.textContent = 'PostgreSQL: Conectado';
  } else {
    if (badge) badge.className = 'db-badge disconnected';
    if (text) text.textContent = 'Modo Demo / Sin Servidor (localStorage)';
    if (globalPill) globalPill.className = 'top-status disconnected';
    if (globalText) globalText.textContent = 'Modo Demo (Local)';
  }
}

/* ==========================================
   5. LISTENERS DE EVENTOS FORMULARIOS
   ========================================== */
$('#f-save').onclick = async () => {
  const d = $('#f-desc').value.trim();
  if (!d) {
    showToast('Por favor escribe la descripción del incidente', 'error');
    $('#f-desc').focus();
    return;
  }
  await addTicket($('#f-user').value.trim(), $('#f-cat').value, $('#f-pri').value, d);
  $('#f-desc').value = '';
  setTab('panel');
};

$('#btn-create-user').onclick = async () => {
  await createUser($('#u-name').value, $('#u-rol').value);
};

$('#ticket-search')?.addEventListener('input', renderTickets);
$('#filter-state')?.addEventListener('change', renderTickets);
$('#filter-cat')?.addEventListener('change', renderTickets);
$('#filter-pri')?.addEventListener('change', renderTickets);

$('#btn-refresh')?.addEventListener('click', async () => {
  showToast('Actualizando datos desde PostgreSQL...', 'info');
  await loadAPI();
});

// Exportar a CSV
$('#btn-export-csv')?.addEventListener('click', () => {
  if (!tickets.length) {
    showToast('No hay tickets para exportar', 'error');
    return;
  }
  const headers = ['ID', 'Solicitante', 'Rol', 'Categoria', 'Prioridad', 'Estado', 'Descripcion', 'CreadoEn'];
  const rows = tickets.map(t => [
    t.id,
    `"${(t.user || '').replace(/"/g, '""')}"`,
    `"${(t.user_rol || '').replace(/"/g, '""')}"`,
    `"${(t.cat || '').replace(/"/g, '""')}"`,
    `"${(t.pri || '').replace(/"/g, '""')}"`,
    `"${(t.est || '').replace(/"/g, '""')}"`,
    `"${(t.desc || '').replace(/"/g, '""')}"`,
    `"${(t.creado_en || '').replace(/"/g, '""')}"`
  ]);
  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `reporte_incidentes_ticketverse_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
  showToast('Reporte CSV generado exitosamente', 'success');
});

// Plantillas rápidas
$$('.t-chip').forEach(chip => {
  chip.onclick = () => {
    $('#f-user').value = chip.dataset.user;
    $('#f-cat').value = chip.dataset.cat;
    $('#f-pri').value = chip.dataset.pri;
    $('#f-desc').value = chip.dataset.desc;
    showToast(`Plantilla "${chip.dataset.cat}" cargada`, 'info');
  };
});

/* ==========================================
   6. CASO 2: CUADRO COMPARATIVO DEL SVS
   ========================================== */
function renderComparativeTable(filter = 'all', searchQuery = '') {
  const table = $('#cmp');
  if (!table) return;

  const filtered = SVS.filter(row => {
    if (filter !== 'all' && !row[0].toLowerCase().includes(filter.toLowerCase())) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return row.some(cell => cell.toLowerCase().includes(q));
    }
    return true;
  });

  table.innerHTML = `
    <thead>
      <tr>
        <th>Componente</th>
        <th>¿Qué es?</th>
        <th>Objetivo según ITIL 4</th>
        <th>Elementos Clave</th>
        <th>Ejemplo en la Gestión Universitaria</th>
      </tr>
    </thead>
    <tbody>
      ${filtered.map((r, i) => `
        <tr data-index="${i}">
          <td><b>${r[0]}</b></td>
          <td>${r[1]}</td>
          <td>${r[2]}</td>
          <td>${r[3]}</td>
          <td>${r[4]}</td>
        </tr>
      `).join('')}
    </tbody>
  `;

  $$('#cmp tbody tr').forEach(tr => {
    tr.onclick = () => {
      $$('#cmp tbody tr').forEach(x => x.classList.remove('hl'));
      tr.classList.add('hl');
      const idx = +tr.dataset.index;
      showDeepDive(filtered[idx]);
    };
  });
}

function showDeepDive(comp) {
  if (!comp) return;
  const box = $('#svs-deep-dive');
  $('#dive-comp-badge').textContent = `Análisis ITIL 4 · ${comp[0]}`;
  $('#dive-title').textContent = comp[0];
  $('#dive-content').innerHTML = `
    <div style="display: flex; flex-direction: column; gap: 12px;">
      <p><b>Definición:</b> ${comp[1]}</p>
      <p><b>Propósito y Meta:</b> ${comp[2]}</p>
      <div style="background: rgba(255,255,255,0.04); padding: 12px; border-radius: 8px; border-left: 3px solid var(--blue);">
        <b>Estructura & Componentes:</b><br>${comp[3]}
      </div>
      <div style="background: rgba(16,185,129,0.08); padding: 12px; border-radius: 8px; border-left: 3px solid var(--green);">
        <b>Caso Práctico en Campus:</b><br>${comp[4]}
      </div>
    </div>
  `;
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Filtros de Cuadro
$$('#cmp-filter-pills .pill').forEach(pill => {
  pill.onclick = () => {
    $$('#cmp-filter-pills .pill').forEach(p => p.classList.remove('on'));
    pill.classList.add('on');
    renderComparativeTable(pill.dataset.filter, $('#cmp-search')?.value);
  };
});

$('#cmp-search')?.addEventListener('input', e => {
  const currentPill = $('#cmp-filter-pills .pill.on')?.dataset.filter || 'all';
  renderComparativeTable(currentPill, e.target.value);
});

/* ==========================================
   7. CASO 3: MAPA MENTAL INTERACTIVO
   ========================================== */
function renderMindMap() {
  const container = $('#mind');
  if (!container) return;

  container.innerHTML = MIND.map((m, i) => `
    <button class="branch-node" data-index="${i}">
      <span>📌 <b>${m[0]}</b></span>
      <small style="opacity: 0.7;">${m[1].length} ideas ➔</small>
    </button>
  `).join('');

  $$('#mind .branch-node').forEach(btn => {
    btn.onclick = () => {
      $$('#mind .branch-node').forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
      const idx = +btn.dataset.index;
      showMindDetail(idx);
    };
  });
}

function showMindDetail(i) {
  const m = MIND[i];
  const detail = $('#mdetail');
  if (!detail || !m) return;
  detail.innerHTML = `
    <h3>🧠 Rama Conceptual: ${m[0]}</h3>
    <p class="mut" style="margin-bottom: 16px;">Ejes temáticos clave discutidos en la sesión:</p>
    <ul>
      ${m[1].map(point => `<li>${point}</li>`).join('')}
    </ul>
  `;
}

/* ==========================================
   8. JUEGOS: QUIZ ITIL & SIMULADOR DE BUGS
   ========================================== */
const QUIZ_QUESTIONS = [
  {
    q: "¿Cuál es el propósito principal del Sistema de Valor del Servicio (SVS) de ITIL 4?",
    opts: [
      "Monitorear exclusivamente la infraestructura de redes y servidores.",
      "Asegurar que la organización co-cree valor continuamente con todas las partes interesadas mediante el uso y gestión de productos y servicios.",
      "Reemplazar a los trabajadores de TI por software automatizado.",
      "Gestionar únicamente las compras de licencias."
    ],
    ans: 1,
    exp: "El SVS describe cómo todos los componentes y actividades de una organización trabajan como un sistema integrado para permitir la co-creación de valor."
  },
  {
    q: "¿Cuál de los siguientes es uno de los 7 Principios Rectores de ITIL 4?",
    opts: [
      "Construir todo desde cero siempre.",
      "Trabajar de forma aislada en cada departamento.",
      "Progresar iterativamente con retroalimentación.",
      "Maximizar la complejidad de los manuales."
    ],
    ans: 2,
    exp: "Progresar iterativamente con retroalimentación aconseja no intentar hacerlo todo a la vez, sino dividir el trabajo en secciones manejables y evaluar los resultados."
  },
  {
    q: "¿Cuáles son las tres actividades clave que forman parte de la Gobernanza en el SVS?",
    opts: [
      "Evaluar, Dirigir y Monitorear.",
      "Comprar, Vender y Facturar.",
      "Diseñar, Construir y Desplegar.",
      "Planificar, Ignorar y Resolver."
    ],
    ans: 0,
    exp: "La gobernanza evalúa la estrategia y requisitos, dirige mediante políticas y metas, y monitorea el rendimiento y cumplimiento normativo."
  },
  {
    q: "En TicketVerse, ¿a qué práctica de ITIL 4 corresponde el registro, priorización y canalización de las solicitudes de los alumnos?",
    opts: [
      "Gestión de relaciones con proveedores.",
      "Mesa de servicio (Service Desk).",
      "Gestión de despliegue de software.",
      "Desarrollo de microservicios."
    ],
    ans: 1,
    exp: "La práctica de Mesa de Servicio proporciona el punto de contacto único entre el proveedor de servicios y todos los usuarios para incidentes y solicitudes."
  },
  {
    q: "¿Qué actividad de la Cadena de Valor del Servicio se enfoca en resolver incidentes y garantizar el funcionamiento diario?",
    opts: [
      "Diseñar y transición.",
      "Entregar y dar soporte (Deliver and Support).",
      "Obtener y construir.",
      "Planificar."
    ],
    ans: 1,
    exp: "'Entregar y dar soporte' asegura que los servicios se entreguen y respalden según las especificaciones acordadas y las expectativas de los usuarios."
  }
];

let quizIndex = 0;
let quizScore = 0;

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  $('#q-start').style.display = 'none';
  renderQuestion();
}

function renderQuestion() {
  if (quizIndex >= QUIZ_QUESTIONS.length) {
    $('#q-text').textContent = `🎉 ¡Quiz completado! Tu puntuación final es ${quizScore} de ${QUIZ_QUESTIONS.length}.`;
    $('#q-opts').innerHTML = '';
    $('#q-feedback').style.display = 'none';
    $('#q-start').style.display = 'inline-block';
    $('#q-start').textContent = 'Reintentar Quiz';
    return;
  }

  const q = QUIZ_QUESTIONS[quizIndex];
  $('#q-counter').textContent = `Pregunta ${quizIndex + 1} de ${QUIZ_QUESTIONS.length}`;
  $('#q-score').textContent = `Puntos: ${quizScore}`;
  $('#q-text').textContent = q.q;
  $('#q-feedback').style.display = 'none';

  $('#q-opts').innerHTML = q.opts.map((opt, i) => `
    <button data-opt="${i}">${opt}</button>
  `).join('');

  $$('#q-opts button').forEach(btn => {
    btn.onclick = () => {
      const selected = +btn.dataset.opt;
      const isCorrect = selected === q.ans;
      if (isCorrect) quizScore++;
      btn.classList.add(isCorrect ? 'ok' : 'bad');
      $$('#q-opts button')[q.ans].classList.add('ok');

      const feedback = $('#q-feedback');
      feedback.style.display = 'block';
      feedback.innerHTML = `<b>${isCorrect ? '✅ ¡Correcto!' : '❌ Incorrecto:'}</b> ${q.exp}`;

      $$('#q-opts button').forEach(b => b.onclick = null);
      quizIndex++;
      setTimeout(renderQuestion, 2400);
    };
  });
}

$('#q-start')?.addEventListener('click', startQuiz);

// Atrapa el bug
let bugPoints = 0;
let bugTimer = null;
let bugMover = null;

$('#g-start')?.addEventListener('click', () => {
  bugPoints = 0;
  let timeLeft = 15;
  const bug = $('#bug');
  const arena = $('#arena');

  $('#g-start').style.display = 'none';
  bug.style.display = 'block';

  const moveBug = () => {
    const maxX = arena.clientWidth - 50;
    const maxY = arena.clientHeight - 50;
    bug.style.left = Math.max(10, Math.random() * maxX) + 'px';
    bug.style.top = Math.max(10, Math.random() * maxY) + 'px';
  };

  moveBug();
  bugMover = setInterval(moveBug, 750);

  bug.onclick = () => {
    bugPoints++;
    $('#g-score').textContent = `Incidentes: ${bugPoints}`;
    moveBug();
  };

  bugTimer = setInterval(() => {
    timeLeft--;
    $('#g-timer').textContent = `Tiempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(bugTimer);
      clearInterval(bugMover);
      bug.style.display = 'none';
      $('#g-timer').textContent = '¡Tiempo finalizado!';
      $('#g-score').textContent = `Resueltos: ${bugPoints}`;
      $('#g-start').style.display = 'inline-block';
      $('#g-start').textContent = 'Jugar nuevamente';
      showToast(`¡Excelente! Resolviste ${bugPoints} incidentes dentro del SLA`, 'success');
    }
  }, 1000);
});

/* ==========================================
   9. VISTA 3D EN ÓRBITA
   ========================================== */
function init3DView() {
  const ring = $('#ring');
  if (!ring) return;
  ring.innerHTML = SVS.map((r, i) => `
    <div class="face" style="transform: rotateY(${i * 72}deg) translateZ(320px);">
      <h3>${r[0]}</h3>
      <p><b>Objetivo:</b> ${r[2]}</p>
      <p><b>Ejemplo:</b> ${r[4]}</p>
    </div>
  `).join('');

  const scene = $('#scene');
  if (scene) {
    scene.onpointermove = e => {
      const r = scene.getBoundingClientRect();
      scene.style.transform = `rotateX(${(0.5 - (e.clientY - r.top) / r.height) * 16}deg)`;
    };
    scene.onpointerleave = () => {
      scene.style.transform = '';
    };
  }
}

/* ==========================================
   10. ASISTENTE INTELIGENTE SPIDEY-IA
   ========================================== */
let voiceEnabled = true;
let currentUsername = 'Estudiante';

function say(text, sender = 'b') {
  const log = $('#log');
  if (!log) return;
  const msg = document.createElement('div');
  msg.className = `m ${sender}`;
  msg.textContent = text;
  log.appendChild(msg);
  log.scrollTop = log.scrollHeight;

  if (sender === 'b' && voiceEnabled && 'speechSynthesis' in window) {
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text.slice(0, 240));
    u.lang = 'es-ES';
    speechSynthesis.speak(u);
  }
}

function processSpideyCommand(query) {
  const q = query.toLowerCase().trim();
  let m;

  // 1. Crear Ticket por comando
  if ((m = q.match(/crea(?:r)? ticket[:\s]+(.+)/))) {
    const desc = m[1];
    addTicket(currentUsername, 'Software', 'Media', desc);
    go('caso1', 'panel');
    return `¡Entendido! Registré el ticket de incidente: "${desc}". Ya aparece disponible en el panel de control.`;
  }

  // 2. Resolver Ticket
  if ((m = q.match(/resolv\w* (?:el )?(?:ticket )?#?(\d+)/))) {
    const id = +m[1];
    resolveTicket(id);
    return `Listo, tramité la resolución del ticket #${id}.`;
  }

  // 3. Resumen y Estado
  if (/resumen|estado|cu[aá]ntos|metricas|m[eé]tricas/.test(q)) {
    const open = tickets.filter(t => t.est !== 'Resuelto').length;
    const res = tickets.filter(t => t.est === 'Resuelto').length;
    return `📊 Estado del sistema: Hay un total de ${tickets.length} incidentes registrados en PostgreSQL (${open} activos y ${res} resueltos). La tasa de atención es del ${Math.round((res / (tickets.length || 1)) * 100)}%.`;
  }

  // 4. Navegación
  if (/caso 1|caso1|tickets|mesa de ayuda/.test(q)) {
    go('caso1', 'panel');
    return 'Te he llevado a la Mesa de Ayuda de TicketVerse (Caso 1).';
  }
  if (/caso 2|caso2|cuadro|componentes/.test(q)) {
    go('caso2');
    return 'Aquí tienes el Cuadro Comparativo de los 5 Componentes del SVS (Caso 2).';
  }
  if (/caso 3|caso3|mapa/.test(q)) {
    go('caso3');
    return 'Abriendo el Mapa Mental interactivo de la sesión (Caso 3).';
  }
  if (/juego|quiz|trivia/.test(q)) {
    go('juegos');
    return '¡Vamos a entrenar! Te llevé a la Zona de Juegos y Quiz ITIL.';
  }
  if (/3d|orbita|órbita/.test(q)) {
    go('vista3d');
    return 'Visualizando el anillo 3D del SVS en el espacio.';
  }

  // 5. Conceptos ITIL 4
  for (const r of SVS) {
    if (q.includes(r[0].toLowerCase().split(' ')[0])) {
      return `📌 ${r[0]}: ${r[1]} Su objetivo es ${r[2]}`;
    }
  }

  if (/qu[eé] es el svs|svs/.test(q)) {
    return 'El Sistema de Valor del Servicio (SVS) de ITIL 4 es el modelo que articula cómo la gobernanza, las prácticas, los principios rectores, la cadena de valor y la mejora continua colaboran armónicamente para convertir las oportunidades en valor de servicio.';
  }

  if (/hola|buenas|saludos/.test(q)) {
    return `¡Hola ${currentUsername}! Estoy listo para apoyarte. Puedes pedirme crear tickets, consultar estadísticas, explicar conceptos de ITIL 4 o navegar entre casos.`;
  }

  return 'Puedes probar con comandos como: "crear ticket: no hay señal de proyector", "resolver ticket 1", "resumen de incidentes", "caso 2", "explicar gobernanza" o "jugar".';
}

function askSpidey(text) {
  if (!text || !text.trim()) return;
  say(text, 'u');
  setTimeout(() => {
    say(processSpideyCommand(text), 'b');
  }, 200);
}

window.toggleBot = function(open) {
  const bot = $('#bot');
  if (!bot) return;
  const isOpen = open !== undefined ? open : !bot.classList.contains('open');
  bot.classList.toggle('open', isOpen);
  if (isOpen && !$('#log').children.length) {
    say(`¡Hola, ${currentUsername}! Soy Spidey-IA, tu copiloto de ITIL 4. ¿En qué te puedo apoyar hoy?`);
  }
};

$('#bot-btn')?.addEventListener('click', () => toggleBot());
$('#bot-x')?.addEventListener('click', () => toggleBot(false));

$('#send')?.addEventListener('click', () => {
  const input = $('#msg');
  askSpidey(input.value);
  input.value = '';
});

$('#msg')?.addEventListener('keydown', e => {
  if (e.key === 'Enter') $('#send').click();
});

// Chips interactivos
const BOT_CHIPS = ['resumen', 'crear ticket: falla en proyector', 'caso 1', 'caso 2', 'caso 3', 'explicar mejora continua'];
const chipsEl = $('#chips');
if (chipsEl) {
  chipsEl.innerHTML = BOT_CHIPS.map(c => `<button>${c}</button>`).join('');
  $$('#chips button').forEach(b => {
    b.onclick = () => askSpidey(b.textContent);
  });
}

// Reconocimiento de voz (SpeechRecognition)
$('#speech-btn')?.addEventListener('click', () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('El reconocimiento de voz no está soportado en este navegador.', 'error');
    return;
  }
  const rec = new SpeechRecognition();
  rec.lang = 'es-ES';
  rec.interimResults = false;
  showToast('🎙️ Escuchando... habla ahora', 'info');
  rec.onresult = e => {
    const transcript = e.results[0][0].transcript;
    $('#msg').value = transcript;
    askSpidey(transcript);
  };
  rec.onerror = () => showToast('No se detectó audio.', 'error');
  rec.start();
});

// Alternar síntesis de voz
$('#mic')?.addEventListener('click', () => {
  voiceEnabled = !voiceEnabled;
  $('#mic').textContent = voiceEnabled ? '🔊' : '🔇';
  if (!voiceEnabled && 'speechSynthesis' in window) speechSynthesis.cancel();
  showToast(`Voz del asistente: ${voiceEnabled ? 'Activada' : 'Silenciada'}`, 'info');
});

/* ==========================================
   11. PANTALLA DE INICIO & LOGIN
   ========================================== */
function initUserSession() {
  const savedName = localStorage.getItem('svs_name');
  if (savedName) {
    currentUsername = savedName;
    $('#name').value = savedName;
    $('#intro-t').textContent = `Identidad detectada: ${savedName}. Pulsa para continuar.`;
    $('#start').textContent = 'Continuar Sesión';
    $('#notme').hidden = false;
    updateUserChipUI();
  }

  $('#start')?.addEventListener('click', () => {
    const n = $('#name').value.trim() || 'Estudiante';
    currentUsername = n;
    try { localStorage.setItem('svs_name', n); } catch (e) {}
    $('#intro').classList.add('out');
    updateUserChipUI();
    showToast(`Bienvenido a SVS Lab, ${n}`, 'success');
  });

  $('#name')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') $('#start').click();
  });

  $('#notme')?.addEventListener('click', () => {
    localStorage.removeItem('svs_name');
    $('#name').value = '';
    $('#notme').hidden = true;
    $('#start').textContent = 'Iniciar Sesión';
    $('#intro-t').textContent = 'Sistema en línea. Identifícate para iniciar tu sesión de trabajo.';
    $('#name').focus();
  });

  $('#user-chip-btn')?.addEventListener('click', () => {
    $('#intro').classList.remove('out');
  });
}

function updateUserChipUI() {
  const nameEl = $('#user-chip-name');
  if (nameEl) nameEl.textContent = currentUsername;
}

// Escape de HTML seguro
function esc(s) {
  return String(s || '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

/* ==========================================
   12. ARRANQUE DEL SISTEMA
   ========================================== */
window.addEventListener('DOMContentLoaded', () => {
  initUserSession();
  renderComparativeTable('all', '');
  renderMindMap();
  init3DView();
  loadAPI();
});