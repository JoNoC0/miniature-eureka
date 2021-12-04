const express = require('express');
const fs = require('fs');
const { notes1 } = require('./db/db.json');
const { default: ShortUniqueId } = require('short-unique-id');
const idNumber = new ShortUniqueId();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));

function findById(id, notesArray) {
    console.log(notesArray);
    const result = notesArray.filter(item => item.id === id)[0];
    
    return result;
};

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
        req.body.id = idNumber();
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

// req.params.id
    // research filter method; looping setup not
    // need to start with fs.readfile

app.delete('/api/notes/:id', function(req, res) {
    console.log(notes1);
    let result = findById(req.params.id, notes1)
    console.log(result);

    // fs.readFile('./db/db.json', function(err, data) {
    //     if (err) throw err
    //     console.log(note);
    //     let notes = JSON.parse(data)
        
    //     
    //     console.log(deleteNote);
    //     // for (let i = 0; i < notes.length; i++) {
    //     //     if (notes[i].id === Number(deleteNote)) {
    //     //       notes.splice([i], 1);
    //     //     }
    //     // }
    //     let data2 = JSON.stringify(notes)
    //     fs.writeFile("./db/db.json", data2, function(err, data) {
    //         if (err) throw err
    //     res.json(notes);
    //     })
    // });
})



app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);