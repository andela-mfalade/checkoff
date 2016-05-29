var pg = require('pg');
var conString = process.env.CHECKOFF_DB_URL;

function DbClient() {
    this.client = new pg.Client(conString);
    this.client.connect(function(err) {
        if (err) return console.error('could not connect to postgres', err);
        console.log("Connection established.")
    });
};

DbClient.prototype.getNotes = getNotes;
DbClient.prototype.saveNote = saveNote;


function getNotes(note, cb) {
    var sql = 'SELECT * from notes'
    this.client.query(sql, function(err, result) {
        return err ? console.error('error running query', err): cb(results.rows);
    });
}

function saveNote(note, cb) {
    var sql = "INSERT INTO notes (title, body, author) VALUES ($1, $2, $3)";
    var values = [note.title, note.content, 'Mayor'];
    this.client.query(sql, values, function(err, result) {
        return err ? console.error('error running query', err): cb(true);
    });
}

exports.DbClient = DbClient;
