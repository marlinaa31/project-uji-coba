const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const siswaRoutes = require('./routes/siswaRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes utama
app.use('/siswa', siswaRoutes);

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});