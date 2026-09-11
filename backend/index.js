const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const TIPOS_VALIDOS = ['Phishing', 'Suplantacion', 'Fraude', 'Acoso', 'Malware', 'Otro'];

function generarReferencia() {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return `CIB-${numero}`;
}

function validarDenuncia(body) {
  const errores = {};

  if (!body.tipo || !TIPOS_VALIDOS.includes(body.tipo)) {
    errores.tipo = 'Seleccioná un tipo de delito válido.';
  }
  if (!body.nombre || String(body.nombre).trim().length < 3) {
    errores.nombre = 'Ingresá tu nombre completo.';
  }
  const email = String(body.email || '').trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errores.email = 'Ingresá un correo electrónico válido.';
  }
  const fecha = body.fecha;
  if (!fecha || Number.isNaN(Date.parse(fecha)) || new Date(fecha) > new Date()) {
    errores.fecha = 'Ingresá una fecha válida y no futura.';
  }
  if (!body.descripcion || String(body.descripcion).trim().length < 20) {
    errores.descripcion = 'Describí lo sucedido (mínimo 20 caracteres).';
  }

  return errores;
}

app.get('/api/salud', (req, res) => {
  res.json({ estado: 'ok' });
});

app.post('/api/denuncias', (req, res) => {
  const errores = validarDenuncia(req.body);
  if (Object.keys(errores).length > 0) {
    return res.status(400).json({ errores });
  }

  const { tipo, nombre, email, fecha, descripcion, evidencia, anonimo } = req.body;

  let referencia;
  let intento = 0;
  const insertar = db.prepare(`
    INSERT INTO denuncias (referencia, tipo, nombre, email, fecha_incidente, descripcion, evidencia, anonimo)
    VALUES (@referencia, @tipo, @nombre, @email, @fecha, @descripcion, @evidencia, @anonimo)
  `);

  while (intento < 5) {
    try {
      referencia = generarReferencia();
      insertar.run({
        referencia,
        tipo,
        nombre: String(nombre).trim(),
        email: String(email).trim(),
        fecha,
        descripcion: String(descripcion).trim(),
        evidencia: evidencia ? String(evidencia).trim() : null,
        anonimo: anonimo ? 1 : 0
      });
      break;
    } catch (err) {
      if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        intento += 1;
        continue;
      }
      console.error(err);
      return res.status(500).json({ error: 'No se pudo registrar la denuncia.' });
    }
  }

  res.status(201).json({ referencia });
});

app.get('/api/denuncias', (req, res) => {
  const filas = db.prepare(`
    SELECT referencia, tipo, nombre, fecha_incidente, descripcion, anonimo, estado, creada_en
    FROM denuncias
    ORDER BY id DESC
  `).all();

  const denuncias = filas.map(d => ({
    referencia: d.referencia,
    tipo: d.tipo,
    nombre: d.anonimo ? 'Anónimo' : d.nombre,
    fechaIncidente: d.fecha_incidente,
    descripcion: d.descripcion,
    estado: d.estado,
    creadaEn: d.creada_en
  }));

  res.json(denuncias);
});

app.get('/api/denuncias/:referencia', (req, res) => {
  const fila = db.prepare(`
    SELECT referencia, tipo, nombre, fecha_incidente, descripcion, anonimo, estado, creada_en
    FROM denuncias
    WHERE referencia = ?
  `).get(req.params.referencia);

  if (!fila) {
    return res.status(404).json({ error: 'Denuncia no encontrada.' });
  }

  res.json({
    referencia: fila.referencia,
    tipo: fila.tipo,
    nombre: fila.anonimo ? 'Anónimo' : fila.nombre,
    fechaIncidente: fila.fecha_incidente,
    descripcion: fila.descripcion,
    estado: fila.estado,
    creadaEn: fila.creada_en
  });
});

app.listen(PORT, () => {
  console.log(`API de CiberAlerta escuchando en http://localhost:${PORT}`);
});
