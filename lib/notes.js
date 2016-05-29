var EventEmitter = require('events');
var util = require('util');
var appUtils = require('./utils');

var NotesApp = function() {
    EventEmitter.call(this);
}
util.inherits(NotesApp, EventEmitter);

var notesApp = new NotesApp();

notesApp.on('save-requested', function(content) {
    appUtils.saveNote(content, showNoteHasBeenSaved);
})

function showNoteHasBeenSaved(isSaved) {
    console.log(isSaved, 'this should read true');
    return isSaved ? true : false;
}


module.exports = notesApp;