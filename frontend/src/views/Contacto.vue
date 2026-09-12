<script setup>
const contactos = [
  {
    nombre: 'Policía Nacional Civil',
    sigla: 'PCN',
    numero: '911',
    tel: '911',
    descripcion: 'Si te encontrás en una emergencia o en riesgo inmediato, llamá al 911.',
    urgente: true
  },
  {
    nombre: 'Fiscalía General de la República',
    sigla: 'FGR',
    numero: '2523-7000',
    tel: '25237000',
    descripcion: 'Para realizar denuncias formales con la Fiscalía General de la República.'
  },
  {
    nombre: 'CiberAlerta',
    sigla: 'CiberAlerta',
    numero: '+503 2668-9045',
    tel: '+50326689045',
    descripcion: 'Para recibir asesoría por llamada con un agente capacitado de CiberAlerta.'
  }
];
</script>

<template>
  <main>
    <section>
      <h2>Contactos</h2>
      <p>Estas son las líneas de contacto disponibles según el tipo de ayuda que necesités.</p>

      <div class="tarjetas">
        <div v-for="c in contactos" :key="c.sigla" class="tarjeta contacto-tarjeta" :class="{ alerta: c.urgente, ok: !c.urgente }">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 0 0 1.5-1.5v-2.723a1.5 1.5 0 0 0-1.164-1.463l-4.043-1.01a1.5 1.5 0 0 0-1.532.522l-.892 1.161a11.036 11.036 0 0 1-5.354-5.354l1.161-.892a1.5 1.5 0 0 0 .522-1.532l-1.01-4.043A1.5 1.5 0 0 0 6.723 3H4.5a1.5 1.5 0 0 0-1.5 1.5v2.25Z" />
            </svg>
            {{ c.sigla }}
          </h3>
          <p>{{ c.descripcion }}</p>
          <a class="contacto-numero" :href="`tel:${c.tel}`">{{ c.numero }}</a>
        </div>
      </div>
    </section>
  </main>
</template>
