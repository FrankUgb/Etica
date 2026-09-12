<script setup>
import { reactive, ref, onMounted } from 'vue';
import { crearDenuncia, obtenerDenuncias } from '../api';

const form = reactive({
  tipo: '',
  nombre: '',
  email: '',
  fecha: '',
  descripcion: '',
  evidencia: '',
  anonimo: false
});

const errores = reactive({});
const enviando = ref(false);
const referenciaConfirmada = ref('');
const errorGeneral = ref('');
const denuncias = ref([]);
const cargandoLista = ref(true);

function validar() {
  Object.keys(errores).forEach(k => delete errores[k]);

  if (!form.tipo) errores.tipo = 'Seleccioná el tipo de delito.';
  if (form.nombre.trim().length < 3) errores.nombre = 'Ingresá tu nombre completo.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errores.email = 'Ingresá un correo electrónico válido.';
  if (!form.fecha || new Date(form.fecha) > new Date()) errores.fecha = 'Seleccioná una fecha válida (no futura).';
  if (form.descripcion.trim().length < 20) errores.descripcion = 'Describí brevemente lo sucedido (mínimo 20 caracteres).';

  return Object.keys(errores).length === 0;
}

async function cargarDenuncias() {
  cargandoLista.value = true;
  try {
    denuncias.value = await obtenerDenuncias();
  } catch (e) {
    console.error(e);
  } finally {
    cargandoLista.value = false;
  }
}

async function enviarFormulario() {
  errorGeneral.value = '';
  referenciaConfirmada.value = '';

  if (!validar()) return;

  enviando.value = true;
  try {
    const { referencia } = await crearDenuncia({ ...form });
    referenciaConfirmada.value = referencia;
    Object.assign(form, { tipo: '', nombre: '', email: '', fecha: '', descripcion: '', evidencia: '', anonimo: false });
    Object.keys(errores).forEach(k => delete errores[k]);
    await cargarDenuncias();
  } catch (e) {
    if (e.errores) {
      Object.assign(errores, e.errores);
    } else {
      errorGeneral.value = e.message || 'No se pudo enviar la denuncia. Intentá nuevamente.';
    }
  } finally {
    enviando.value = false;
  }
}

onMounted(cargarDenuncias);
</script>

<template>
  <main>
    <section>
      <h2>Denunciar un delito informático</h2>

      <div class="emergencia">
        <strong>¿Estás en riesgo inmediato?</strong> Si tu seguridad física está en peligro, contactá primero a la policía o a la línea de emergencias de tu país.
      </div>

      <div v-if="referenciaConfirmada" class="alerta-caja exito">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
        <span>Tu denuncia fue registrada correctamente. Número de referencia: <strong>{{ referenciaConfirmada }}</strong></span>
      </div>

      <div v-if="errorGeneral" class="alerta-caja error">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <span>{{ errorGeneral }}</span>
      </div>

      <form class="formulario" @submit.prevent="enviarFormulario" novalidate>

        <div class="campo" :class="{ invalido: errores.tipo }">
          <label for="tipo">Tipo de delito *</label>
          <select id="tipo" v-model="form.tipo">
            <option value="">Seleccioná una opción</option>
            <option value="Phishing">Phishing / correo o mensaje falso</option>
            <option value="Suplantacion">Suplantación de identidad</option>
            <option value="Fraude">Fraude o estafa en línea</option>
            <option value="Acoso">Acoso, amenazas o ciberbullying</option>
            <option value="Malware">Virus, malware o ransomware</option>
            <option value="Otro">Otro</option>
          </select>
          <span v-if="errores.tipo" class="error">{{ errores.tipo }}</span>
        </div>

        <div class="campo" :class="{ invalido: errores.nombre }">
          <label for="nombre">Nombre completo *</label>
          <input type="text" id="nombre" v-model="form.nombre" placeholder="Ej: Juan Pérez">
          <span v-if="errores.nombre" class="error">{{ errores.nombre }}</span>
        </div>

        <div class="campo" :class="{ invalido: errores.email }">
          <label for="email">Correo electrónico *</label>
          <input type="email" id="email" v-model="form.email" placeholder="ejemplo@correo.com">
          <small>Lo usaremos únicamente para darte seguimiento a tu denuncia.</small>
          <span v-if="errores.email" class="error">{{ errores.email }}</span>
        </div>

        <div class="campo" :class="{ invalido: errores.fecha }">
          <label for="fecha">Fecha del incidente *</label>
          <input type="date" id="fecha" v-model="form.fecha">
          <span v-if="errores.fecha" class="error">{{ errores.fecha }}</span>
        </div>

        <div class="campo" :class="{ invalido: errores.descripcion }">
          <label for="descripcion">Descripción de los hechos *</label>
          <textarea id="descripcion" v-model="form.descripcion" placeholder="Contanos qué pasó, con el mayor detalle posible..."></textarea>
          <span v-if="errores.descripcion" class="error">{{ errores.descripcion }}</span>
        </div>

        <div class="campo">
          <label for="evidencia">¿Contás con evidencia? (capturas, correos, links, etc.)</label>
          <textarea id="evidencia" v-model="form.evidencia" placeholder="Opcional: describí o pegá enlaces a tu evidencia"></textarea>
        </div>

        <div class="campo">
          <label>
            <input type="checkbox" v-model="form.anonimo" style="width:auto; display:inline-block;">
            Prefiero hacer esta denuncia de forma anónima
          </label>
        </div>

        <button type="submit" class="btn" :disabled="enviando">
          <span v-if="enviando" class="spinner"></span>
          {{ enviando ? 'Enviando...' : 'Enviar denuncia' }}
        </button>
      </form>

      <div class="lista-denuncias">
        <h2>Denuncias registradas</h2>
        <p v-if="cargandoLista">Cargando...</p>
        <p v-else-if="denuncias.length === 0">No hay denuncias registradas todavía.</p>
        <div v-else v-for="d in denuncias" :key="d.referencia" class="denuncia-item">
          <span class="badge">{{ d.referencia }}</span>
          <span class="badge estado">{{ d.estado }}</span>
          <strong>{{ d.tipo }}</strong>
          <p>{{ d.descripcion }}</p>
          <div class="meta">
            Denunciante: {{ d.nombre }} · Fecha del incidente: {{ d.fechaIncidente }} · Registrada el {{ new Date(d.creadaEn).toLocaleString('es-ES') }}
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
