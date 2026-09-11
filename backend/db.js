const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'ciberalerta.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS denuncias (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    referencia TEXT NOT NULL UNIQUE,
    tipo TEXT NOT NULL,
    nombre TEXT NOT NULL,
    email TEXT NOT NULL,
    fecha_incidente TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    evidencia TEXT,
    anonimo INTEGER NOT NULL DEFAULT 0,
    estado TEXT NOT NULL DEFAULT 'Recibida',
    creada_en TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

module.exports = db;
