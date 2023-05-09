const fs = require('fs/promises')
const path = require('path')
const chalc = require('chalk')

const notesPath = path.join(__dirname, 'db.json')

async function addNote(title) {
  const notes = await getNotes()
  const note = {
    title,
    id: Date.now().toString()
  }

  notes.push(note)

  await fs.writeFile(notesPath, JSON.stringify(notes))
  console.log(chalc.bgGreen('Note was added!'))
}

async function getTitleById(id) {
  const notes = await getNotes()
  const note = notes.find(note => note.id === id)
  return note?.title || []
}

async function getNotes() {
  const notes = await fs.readFile(notesPath, {encoding: 'utf-8'})
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : []
}

async function printNotes() {
  const notes = await getNotes()

  console.log(chalc.bgBlue('List of notes:'))
  notes.forEach(note => {
    console.log(chalc.blue(note.id), chalc.blue(note.title))
  })
}

async function removeNote(id) {
  const notes = await getNotes()
  newNotes = notes.filter(note => note.id !== id.toString())
  await fs.writeFile(notesPath, JSON.stringify(newNotes ?? []))
  if (JSON.stringify(notes) !== JSON.stringify(newNotes)) {
    console.log(chalc.bgYellow('Note was deleted!'))
  }
}

async function editNote(id, title) {
  const notes = await getNotes()
  newNotes = notes.map(note => {
    if (note.id === id) {
      note.title = title
    }
    return note
  })
  await fs.writeFile(notesPath, JSON.stringify(newNotes ?? []))
}

module.exports = {
  addNote, printNotes, removeNote, getNotes, getTitleById, editNote
}