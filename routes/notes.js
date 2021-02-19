const express = require("express");
const router = express.Router();
const Note = require("../models/note");

//Getting all objects from db
router.get("/", async (req, res) => {
  try {
    let notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//Getting one object by id
router.get("/:id", getNote, (req, res) => res.json(res.note));
//Posting new object to the db
router.post("/", async (req, res) => {
  let note = new Note({
    noteTitle: req.body.noteTitle,
    noteContent: req.body.noteContent,
  });
  try {
    let newNote = await note.save();
    res.status(201).json({ newNote });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Update one object by id
router.patch("/:id", getNote, async (req, res) => {
  //update note title
  if (req.body.noteTitle != null) res.note.noteTitle = req.body.noteTitle;
  //update note content
  if (req.body.noteContent != null) res.note.noteContent = req.body.noteContent;
  try {
    let notToUpdate = await res.note.save();
    res.json(notToUpdate);
  } catch (err) {
    res.status(400).json({ message: "Note cannot be updated. " + err.message });
  }
});
//Delete one object from db by id
router.delete("/:id", getNote, async (req, res) => {
  try {
    await res.note.remove();
    res.json(res.note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//help us find note by id
async function getNote(req, res, next) {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null)
      return res.status(404).json({ message: "Cannot find movie!" });
  } catch (err) {
    res.status(500).json({ message: "The ID selected was not found." });
  }
  res.note = note;
  next();
}

module.exports = router;
