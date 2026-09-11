const STORAGE_KEY = 'ciberalerta_denuncias';

function obtenerDenuncias() {
  const datos = localStorage.getItem(STORAGE_KEY);
  return datos ? JSON.parse(datos) : [];
}

function guardarDenuncia(denuncia) {
  const denuncias = obtenerDenuncias();
  denuncias.unshift(denuncia);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(denuncias));
}

function generarReferencia() {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return `CIB-${numero}`;
}

function mostrarError(idCampo, mostrar) {
  const campo = document.getElementById(idCampo);
  if (mostrar) {
    campo.classList.add('invalido');
  } else {
    campo.classList.remove('invalido');
  }
}

function validarFormulario(form) {
  let valido = true;

  const tipo = form.tipo.value.trim();
  mostrarError('campo-tipo', !tipo);
  if (!tipo) valido = false;

  const nombre = form.nombre.value.trim();
  mostrarError('campo-nombre', nombre.length < 3);
  if (nombre.length < 3) valido = false;

  const email = form.email.value.trim();
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  mostrarError('campo-email', !emailValido);
  if (!emailValido) valido = false;

  const fecha = form.fecha.value;
  const fechaValida = fecha && new Date(fecha) <= new Date();
  mostrarError('campo-fecha', !fechaValida);
  if (!fechaValida) valido = false;

  const descripcion = form.descripcion.value.trim();
  mostrarError('campo-descripcion', descripcion.length < 20);
  if (descripcion.length < 20) valido = false;

  return valido;
}

function renderizarDenuncias() {
  const contenedor = document.getElementById('lista-denuncias-contenido');
  if (!contenedor) return;

  const denuncias = obtenerDenuncias();

  if (denuncias.length === 0) {
    contenedor.innerHTML = '<p>No hay denuncias registradas todavía.</p>';
    return;
  }

  contenedor.innerHTML = denuncias.map(d => `
    <div class="denuncia-item">
      <span class="badge">${d.referencia}</span>
      <strong>${d.tipo}</strong>
      <p>${d.descripcion}</p>
      <div class="meta">
        Denunciante: ${d.anonimo ? 'Anónimo' : d.nombre} · Fecha del incidente: ${d.fecha} · Registrada el ${d.registradaEl}
      </div>
    </div>
  `).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-denuncia');
  if (!form) return;

  renderizarDenuncias();

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    if (!validarFormulario(form)) {
      return;
    }

    const referencia = generarReferencia();

    const denuncia = {
      referencia,
      tipo: form.tipo.value,
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      fecha: form.fecha.value,
      descripcion: form.descripcion.value.trim(),
      evidencia: form.evidencia.value.trim(),
      anonimo: form.anonimo.checked,
      registradaEl: new Date().toLocaleString('es-ES')
    };

    guardarDenuncia(denuncia);

    const confirmacion = document.getElementById('confirmacion');
    confirmacion.style.display = 'block';
    confirmacion.innerHTML = `✅ Tu denuncia fue registrada correctamente. Número de referencia: <strong>${referencia}</strong>`;
    confirmacion.scrollIntoView({ behavior: 'smooth' });

    form.reset();
    ['campo-tipo', 'campo-nombre', 'campo-email', 'campo-fecha', 'campo-descripcion'].forEach(id => mostrarError(id, false));

    renderizarDenuncias();
  });
});
