const dbJSON = require("../db/db.json");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = function (app) {
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
      }
      let notes = JSON.parse(data);
      res.json(notes);
    });
  });

  app.post("/api/notes", function (req, res) {
    let newNote = req.body;
    newNote.id = uuidv4();
    let allNotes = [];

    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
      }
      allNotes = JSON.parse(data);
      allNotes.push(newNote);

      fs.writeFile("./db/db.json", JSON.stringify(allNotes), function (err) {
        if (err) {
          console.log(err);
        }
        return res.json(allNotes);
      });
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    let noteId = req.params.id;

    fs.readFile("./db/db.json", function (err, data) {
      if (err) {
        console.log(err);
      }
      const notesArr = JSON.parse(data);
      console.log(notesArr);
      const idFilter = notesArr.filter((entry) => entry.id !== noteId);

      fs.writeFile("./db/db.json", JSON.stringify(idFilter), function (err) {
        if (err) {
          console.log(err);
        }
        return res.json(dbJSON);
      });
    });
  });
};
