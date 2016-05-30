var api = require('./api');
var dbClient = new api.DbClient();


function saveNote(note, cb) {
    dbClient.saveNote(note, cb);
}

function updateNote(note, cb) {
    dbClient.updateNote(note, cb);
}

function getAllNotes(cb) {
    dbClient.getAllNotes(cb);
}

function getNote(noteId, cb) {
    dbClient.getNote(noteId, cb);
}

function deleteNote(noteId, cb) {
    dbClient.deleteNote(noteId, cb);
}

exports.getNote = getNote;
exports.saveNote = saveNote;
exports.deleteNote = deleteNote;
exports.updateNote = updateNote;
exports.getAllNotes = getAllNotes;