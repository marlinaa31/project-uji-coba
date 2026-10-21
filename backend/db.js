const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adeklina',
    database: 'siswa'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Koneksi database berhasil');   
});

module.exports = db;