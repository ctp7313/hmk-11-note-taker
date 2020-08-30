const dbJson = require('../db/db.json');
const fs = require('fs');
// const express = require('express');
// const app = express()

module.exports = function (app) {

  app.get('/api/notes', function (req, res) {
    res.json(dbJson);
  });

  app.post('/api/notes', function (req, res) {
    const newNote = req.body;
    fs.readFile(dbJson, (err, data) => {
      if (err) throw err;
      console.log(data);
    });
    

    fs.writefile(dbJson, (data, err) => {
      if (err) throw err;
      res.json(data)
    }
   )});

  app.delete('/api/notes', function (req, res) {

  });

};
