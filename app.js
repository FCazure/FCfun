const express = require('express');
const cors = require('cors'); // Memanggil paket CORS
const app = express();

app.use(cors()); // Menggunakan middleware CORS
// Middleware untuk melayani file statis dari direktori 'public'
app.use(express.static('football-formation-lineup'));
app.use(express.json()); // Middleware untuk parsing JSON

app.post('/update-json', (req, res) => {
    const data = req.body;
    try {
        fs.writeFileSync('football-formation-lineup/players.json', JSON.stringify(data), 'utf8');
        res.send('File updated successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error writing to file');
    }
});



app.listen(3000, () => console.log('Server running on port 3000'));
