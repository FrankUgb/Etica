const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function manejarRespuesta(res) {
  const datos = await res.json().catch(() => ({}));
  if (!res.ok) {
    const error = new Error(datos.error || 'Ocurrió un error inesperado.');
    error.errores = datos.errores || null;
    throw error;
  }
  return datos;
}

export async function crearDenuncia(denuncia) {
  const res = await fetch(`${API_URL}/api/denuncias`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(denuncia)
  });
  return manejarRespuesta(res);
}

export async function obtenerDenuncias() {
  const res = await fetch(`${API_URL}/api/denuncias`);
  return manejarRespuesta(res);
}
