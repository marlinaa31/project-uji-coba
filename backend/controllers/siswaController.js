const db = require('../db');

// Create - Tambah Produk
exports.createSiswa = (req, res) => {
    const {nama, umur} = req.body;
    db.query(
        'INSERT INTO datasiswa (nama, umur) VALUES (?, ?)',
        [nama, umur],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Data Siswa berhasil ditambahkan', id: result.insertId });
        }
    );
};

exports.getAllSiswa = (req, res) => {
    db.query('SELECT * FROM datasiswa', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getSiswaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM datasiswa WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message});
        if (result.length === 0) return res.status(404).json({ message: 'Data Siswa tidak ditemukan' });
        res.json(result[0]);
    });
};

exports.updateSiswa = (req, res) => {
    const {id} = req.params;
    const {nama, umur} = req.body;
    db.query(
        'UPDATE datasiswa SET nama=?, umur=? WHERE id=?',
        [nama, umur, id],
        (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Data Siswa berhasil diupdate' });
        }
    );
};

exports.deleteSiswa = (req, res) => {
    const {id} = req.params;
    db.query('DELETE FROM datasiswa WHERE id=?', [id], (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        res.json({ message: 'Data Siswa berhasil dihapus' });
    });
};

