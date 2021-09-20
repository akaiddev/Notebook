const AsyncHandler = require('express-async-handler')
const Note = require('../models/noteModel')

const getNotes = AsyncHandler(async (req, res) => {
  const notes = await Note.find()
  res.json(notes)
})

const createNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body

  if (!title || !content || !category) {
    res.status(404)
    throw new Error('Please Fill Al The Fields')
  } else {
    const note = new Note({ user: req.user._id, title, content, category })
    const createdSave = await note.save()
    res.status(201).json(createdSave)
  }
})

const getNoteById = AsyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id)
  if (note) {
    res.json(note)
  } else {
    res.status(404).json({ message: 'Note Not Found' })
  }
})

const updateNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body

  const note = await Note.findById(req.params.id)

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404)
    throw new Error('You Can`t Perform this action')
  }

  if (note) {
    note.title = title
    note.content = content
    note.category = category
    const updatedNote = await note.save()

    res.json(updatedNote)
  } else {
    res.status(404).json({ message: 'Note Not Found' })
  }
})

const deleteNote = AsyncHandler(async (req, res) => {
  const { title, content, category } = req.body

  const note = await Note.findById(req.params.id)

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(404)
    throw new Error('You Can`t Perform this action')
  }

  if (note) {
    await note.remove()
    res.json({ message: 'Note Removed' })
  } else {
    res.status(404).json({ message: 'Note Not Found' })
  }
})

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote }
