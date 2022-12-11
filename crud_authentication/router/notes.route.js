const express = require("express");

const noteRouter = express.Router();

const { noteModel } = require("../model/note.model");

noteRouter.get("/", async (req, res) => {
  try {
    const getdata = await noteModel.find();

    res.send(getdata);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

noteRouter.post("/create", async (req, res) => {
  try {
    const payload = req.body;
    const new_note = new noteModel(payload);
    await new_note.save();
    res.send({ message: "note is created" });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

noteRouter.put("/update/:noteId", async (req, res) => {
  try {
    const payload = req.body;
    const noteId = req.params.noteId;

    const userID = req.body.userId;
    console.log(userID);
    const user = await noteModel.findOne({ _id: noteId });
    console.log(user);
    if (userID !== user.userId) {
      res.send("user is not authorized");
    } else {
      await noteModel.findByIdAndUpdate({ _id: noteId }, payload);
      res.send("note is updated");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

noteRouter.delete("/delete/:noteId", async (req, res) => {
  try {
  
    const noteId = req.params.noteId;

    const userID = req.body.userId;
    console.log(userID);
    const user = await noteModel.findOne({ _id: noteId });
    console.log(user);
    if (userID !== user.userId) {
      res.send("user is not authorized");
    } else {
      await noteModel.findByIdAndDelete({ _id: noteId });
      res.send("note is deleted");
    }
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = { noteRouter };
