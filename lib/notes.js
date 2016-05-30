var EventEmitter = require('events');
var util = require('util');
var appUtils = require('./utils');

var NotesApp = function() {
    EventEmitter.call(this);
}
util.inherits(NotesApp, EventEmitter);

var notesApp = new NotesApp();

notesApp.on('save-requested', function(note) {
    note.id ? appUtils.updateNote(note, showNoteHasBeenSaved): appUtils.saveNote(note, showNoteHasBeenSaved);
});

notesApp.on('note-requested', function(noteId) {
    appUtils.getNote(noteId, returnNote);
});

notesApp.on('notes-requested', function() {
    appUtils.getAllNotes(deliverNotes);
});

function returnNote(note) {
    notesApp.emit('note-delivered', note);
}

function deliverNotes(notes) {
    notesApp.emit('notes-delivered', notes);
}

function showNoteHasBeenSaved(result) {
    var noteId = result.rows[0].id;
    result ? notesApp.emit('note-saved', noteId) : notesApp.emit('save-failed');
}

module.exports = notesApp;