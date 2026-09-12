<script setup>
</script>

<template>
  <section class="hero">
    <h1>Portal de Denuncias de Ciberdelitos</h1>
    <p>Un espacio seguro para que los ciudadanos denuncien delitos informáticos, aprendan a protegerse y reciban orientación sobre el cuidado de sus datos personales.</p>
    <router-link to="/denunciar" class="btn">Denunciar ahora</router-link>
    <router-link to="/seguridad" class="btn secundario">Ver medidas de seguridad</router-link>
  </section>

  <main>
    <section>
      <h2>¿Qué podés hacer acá?</h2>
      <div class="tarjetas">
        <div class="tarjeta">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m-8 5h10a2 2 0 0 0 2-2V7.5L14.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2Z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 3v4.5a1 1 0 0 0 1 1H19" />
            </svg>
            Denunciar
          </h3>
          <p>Reportá fraudes, estafas, robo de identidad, acoso digital u otros delitos informáticos completando un formulario simple.</p>
          <router-link to="/denunciar">Ir al formulario →</router-link>
        </div>
        <div class="tarjeta">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <rect x="5" y="11" width="14" height="9" rx="2" stroke-linecap="round" stroke-linejoin="round" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            Medidas de seguridad
          </h3>
          <p>Consejos prácticos para proteger tus cuentas, dispositivos y redes frente a ataques y estafas comunes.</p>
          <router-link to="/seguridad">Ver medidas →</router-link>
        </div>
        <div class="tarjeta">
          <h3>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.5c-1.7-1-4-1.5-6.5-1.5v13c2.5 0 4.8.5 6.5 1.5m0-13c1.7-1 4-1.5 6.5-1.5v13c-2.5 0-4.8.5-6.5 1.5m0-13v13" />
            </svg>
            Protección de datos
          </h3>
          <p>Orientación sobre tus derechos y buenas prácticas para el manejo de tu información personal en línea.</p>
          <router-link to="/proteccion-datos">Ver orientación →</router-link>
        </div>
      </div>
    </section>

    <section>
      <h2>Delitos informáticos frecuentes</h2>
      <div class="tarjetas">
        <div class="tarjeta alerta"><h3>Phishing</h3><p>Correos o mensajes falsos que buscan robar tus datos o contraseñas.</p></div>
        <div class="tarjeta alerta"><h3>Suplantación de identidad</h3><p>Uso de tu identidad o datos personales sin tu consentimiento.</p></div>
        <div class="tarjeta alerta"><h3>Fraude en compras online</h3><p>Estafas en ventas o pagos a través de internet.</p></div>
        <div class="tarjeta alerta"><h3>Acoso o ciberbullying</h3><p>Hostigamiento, amenazas o difusión de contenido sin consentimiento.</p></div>
      </div>
    </section>
  </main>
</template>
