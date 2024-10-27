import Database from 'better-sqlite3';
import { dir } from '../dirroot.js';
import path from 'path';

//faz o caminho ser Agnostico ao Sistema Operacional
const pathDB = path.join(dir, '..', 'dados.db');

const db = new Database(pathDB, {
    verbose: console.log,
});

db.exec(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(50) NOT NULL,
        cpf CHARACTER(11) UNIQUE NOT NULL,
        phone CHARACTER(11) NOT NULL,
        email TEXT NOT NULL,
        role TEXT DEFAULT 'Cliente' CHECK(role = 'Cliente' or role = 'Administrador'),
        created_at TEXT 
    );

    CREATE TABLE IF NOT EXISTS emails (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id), 
        email TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS phones (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER REFERENCES users(id), 
        phone CHARACTER(11) NOT NULL
    );
`);

export {
    db
}