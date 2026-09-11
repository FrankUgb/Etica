import { createRouter, createWebHashHistory } from 'vue-router';
import Inicio from './views/Inicio.vue';
import Denunciar from './views/Denunciar.vue';
import Seguridad from './views/Seguridad.vue';
import ProteccionDatos from './views/ProteccionDatos.vue';

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'inicio', component: Inicio },
    { path: '/denunciar', name: 'denunciar', component: Denunciar },
    { path: '/seguridad', name: 'seguridad', component: Seguridad },
    { path: '/proteccion-datos', name: 'proteccion-datos', component: ProteccionDatos }
  ],
  scrollBehavior() {
    return { top: 0 };
  }
});

export default router;
