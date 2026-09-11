<script setup>
</script>

<template>
  <main>
    <section>
      <h2>Medidas de seguridad digital</h2>
      <p>Adoptar buenos hábitos digitales reduce enormemente el riesgo de ser víctima de un delito informático. Estas son las recomendaciones esenciales:</p>

      <div class="tarjetas">
        <div class="tarjeta ok">
          <h3>🔑 Contraseñas seguras</h3>
          <p>Usá contraseñas largas, únicas para cada cuenta, con letras, números y símbolos. Considerá un gestor de contraseñas.</p>
        </div>
        <div class="tarjeta ok">
          <h3>🔐 Autenticación en dos pasos (2FA)</h3>
          <p>Activá la verificación en dos pasos en tus cuentas importantes: correo, redes sociales y banca en línea.</p>
        </div>
        <div class="tarjeta ok">
          <h3>✉️ Cuidado con el phishing</h3>
          <p>Desconfiá de correos o mensajes que piden datos personales, contraseñas o generan urgencia. Verificá siempre el remitente.</p>
        </div>
        <div class="tarjeta ok">
          <h3>🔄 Mantené todo actualizado</h3>
          <p>Actualizá tu sistema operativo, navegador y aplicaciones para corregir vulnerabilidades conocidas.</p>
        </div>
        <div class="tarjeta ok">
          <h3>📶 Redes Wi-Fi seguras</h3>
          <p>Evitá ingresar datos sensibles en redes Wi-Fi públicas o desconocidas. Usá una VPN si es necesario.</p>
        </div>
        <div class="tarjeta ok">
          <h3>💾 Copias de seguridad</h3>
          <p>Hacé backups periódicos de tu información importante, así protegés tus datos frente a un ataque de ransomware.</p>
        </div>
        <div class="tarjeta ok">
          <h3>🦠 Antivirus y firewall</h3>
          <p>Mantené activo un antivirus confiable y el firewall de tu equipo o red doméstica.</p>
        </div>
        <div class="tarjeta ok">
          <h3>👀 Revisá tus permisos</h3>
          <p>Controlá qué aplicaciones tienen acceso a tu cámara, ubicación, contactos y archivos.</p>
        </div>
      </div>

      <h2>Señales de alerta</h2>
      <ul>
        <li>Mensajes que piden actuar "urgente" o "antes de que se bloquee tu cuenta".</li>
        <li>Enlaces acortados o con dominios extraños.</li>
        <li>Ofertas o premios que parecen demasiado buenos para ser verdad.</li>
        <li>Solicitudes de contraseñas, códigos de verificación o datos bancarios por mensaje o correo.</li>
      </ul>

      <p style="margin-top:2rem;">Si sospechás que fuiste víctima de un delito informático, no dudes en <router-link to="/denunciar">hacer tu denuncia</router-link>.</p>
    </section>
  </main>
</template>
