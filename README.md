# CiberAlerta — Portal de Denuncias de Ciberdelitos

Proyecto educativo (Ética) para que los ciudadanos puedan:
- Denunciar delitos informáticos.
- Conocer medidas de seguridad.
- Recibir orientación sobre protección de datos.

**Sitio en vivo:** https://frankugb.github.io/Etica/

## Stack

- **Frontend:** Vue 3 + Vite + Vue Router (`/frontend`)
- **Backend:** Node.js + Express + SQLite (`/backend`)
- El frontend compilado se publica en `/docs` vía GitHub Pages.
- El backend se despliega por separado (ej. Render) ya que GitHub Pages solo sirve contenido estático.

## Desarrollo local

### Backend

```bash
cd backend
npm install
npm run dev
```

Levanta la API en `http://localhost:4000`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Levanta la app en modo desarrollo. Por defecto apunta a `http://localhost:4000` como API.
Para apuntar a otra URL, creá un archivo `.env` en `frontend/` con:

```
VITE_API_URL=https://tu-backend-desplegado.onrender.com
```

## Compilar para producción

```bash
cd frontend
npm run build
```

Copiar el contenido de `frontend/dist` a la carpeta `docs/` en la raíz del proyecto y hacer commit/push — GitHub Pages sirve automáticamente desde ahí.
