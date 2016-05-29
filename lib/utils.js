var api = require('./api');
var dbClient = new api.DbClient();


function saveNote(note, cb) {
    dbClient.saveNote(note, cb);
}

exports.saveNote = saveNote;