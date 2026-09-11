<script setup>
</script>

<template>
  <header class="app-header">
    <div class="logo">🛡️ Ciber<span>Alerta</span></div>
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
