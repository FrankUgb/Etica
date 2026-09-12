<script setup>
</script>

<template>
  <header class="app-header">
    <div class="logo">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21c-3.6-1.2-7.5-4.6-7.5-9.6V6l7.5-3 7.5 3v5.4c0 5-3.9 8.4-7.5 9.6Z" />
        <path stroke-linecap="round" stroke-linejoin="round" d="m9 12 2 2 4-4" />
      </svg>
      Ciber<span>Alerta</span>
    </div>
    <nav class="main-nav">
      <ul>
        <li><router-link to="/">Inicio</router-link></li>
        <li><router-link to="/denunciar">Denunciar</router-link></li>
        <li><router-link to="/seguridad">Medidas de Seguridad</router-link></li>
        <li><router-link to="/proteccion-datos">Protección de Datos</router-link></li>
      </ul>
    </nav>
  </header>

  <router-view />

  <footer class="app-footer">
    <p>Portal de Denuncias de Ciberdelitos — Proyecto educativo (Ética). Construido con Vue 3 + Express + SQLite.</p>
  </footer>
</template>
