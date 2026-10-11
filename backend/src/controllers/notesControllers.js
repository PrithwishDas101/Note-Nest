import mongoose from "mongoose";
import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find({ ownerId: req.user.id }).sort({ updatedAt: -1 });
    return res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getNoteById(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const note = await Note.findOne({ _id: req.params.id, ownerId: req.user.id });
    if (!note) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    if (typeof title !== "string" || typeof content !== "string" || !title.trim() || !content.trim()) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const newNote = new Note({
      ownerId: req.user.id,
      title: title.trim(),
      content: content.trim(),
    });
    const savedNote = await newNote.save();
    return res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function updateNote(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const updates = {};
    if (typeof req.body.title === "string") updates.title = req.body.title.trim();
    if (typeof req.body.content === "string") updates.content = req.body.content.trim();
    if (typeof req.body.pinned === "boolean") updates.pinned = req.body.pinned;

    if (updates.title !== undefined && !updates.title) {
      return res.status(400).json({ message: "Title cannot be empty" });
    }
    if (updates.content !== undefined && !updates.content) {
      return res.status(400).json({ message: "Content cannot be empty" });
    }
    if (updates.title && updates.title.length > 160) {
      return res.status(400).json({ message: "Title must be 160 characters or fewer" });
    }
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid changes were provided" });
    }

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, ownerId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deleteNote(req, res) {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(404).json({ message: "Note not found" });
  }

  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.id,
      ownerId: req.user.id,
    });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });
    return res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}