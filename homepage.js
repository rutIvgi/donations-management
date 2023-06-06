const express = require('express');
const app = express();
const port = 3000;
const list = require("./ListOfDonors");

app.get('/donors', (req, res) => {
    res.send(list)});

app.get('/donors/:id', (req, res) => {
    res.send(list.find(user => user.id == req.params.id).name);});

app.delete('/delete-donor/:id', (req, res) => {
    // list.find(user => user.id == req.params.id).delete;
    // res.send(list.find(user => user.id == req.params.id).name + "נמחק בהצלחה");
    res.send(list.filter(x=>{return x.id!=req.params.id}));
});

app.post('/add-donor', (req, res) => {
    let newStudentStr = '';
    req.on('data', chunk => newStudentStr += chunk)
    req.on('end', () => {
        let newStudent = JSON.parse(newStudentStr);
        newStudent.id = 4;//todo: calculate...
        list.push(newStudent);
        res.end(`{ newStudentId:${newStudent.id} add}`)
    })
})

app.listen(port);

