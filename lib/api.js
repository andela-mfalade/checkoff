var pg = require('pg');
var conString = process.env.CHECKOFF_DB_URL;

function DbClient() {
    this.client = new pg.Client(conString);
    this.client.connect(function(err) {
        return err ? console.error('could not connect to postgres', err): console.log("Connection Established");
    });
};

DbClient.prototype.getNote    = getNote;
DbClient.prototype.runQuery    = runQuery;
DbClient.prototype.saveNote    = saveNote;
DbClient.prototype.updateNote  = updateNote;
DbClient.prototype.getAllNotes = getAllNotes;

function runQuery(sql, values, cb) {
    this.client.query(sql, values, function(err, result) {
        return err ? console.error('error running query', err): cb(result);
    });
}

function getNote(noteId, cb) {
    var sql = 'SELECT * FROM notes WHERE id=$1';
    var values = [noteId];
    this.runQuery(sql, values, cb);
}

function getAllNotes(cb) {
    var sql = 'SELECT * FROM notes;';
    var values = null;
    this.runQuery(sql, values, cb);
}

function saveNote(note, cb) {
    var sql = "INSERT INTO notes (body, author) VALUES ($1, $2) RETURNING id";
    var values = [note.body, 'Mayor'];
    this.runQuery(sql, values, cb);
}

function updateNote(note, cb) {
    var sql = "UPDATE notes SET body=$1 WHERE id=$2 RETURNING id";
    var values = [note.body, note.id];
    this.runQuery(sql, values, cb);
}

exports.DbClient = DbClient;
