const express = require('express');
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
    res.sendFile(__dirname + '/public/notes.html');
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function(err, data) {
        if (err) throw err
        let notes = JSON.parse(data)
        res.json(notes)
    })
});

app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', function(err, data) {
        if (err) throw err
        let notes = JSON.parse(data)
        console.log(notes);
        console.log(req.body);
        notes.push(req.body);
        console.log(notes);
        let data2 = JSON.stringify(notes)
        fs.writeFile('./db/db.json', data2, function(err) {
            if (err) throw err
        res.json(notes);
        })
    })
});





app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);