function init() {
    var notesApp = require('./app');
    var typingTimer;
    var noteContent = {};
    var timeToSave = 2000;
    var globalNotes = null;
    var activeNoteId = null;
    var $noteItem = $('.noteItem');
    var $favButton = $('.fav');
    var $noteForm = $('#noteForm');
    var $notesList = $('.notesList');
    var $contentForm = $('#noteContent');
    var $newNoteButton = $('.addNoteIcon');

    //- Listeners
    $contentForm.on('keyup', saveNote);
    notesApp.on('note-saved', assignNoteId);
    notesApp.on('note-delivered', renderNote);
    $newNoteButton.on('click', createNewNote);
    notesApp.on('note-deleted', createNewNote);
    $notesList.on('click', '.noteItem', getNote);
    $contentForm.on('keydown', clearSaveTimeout);
    notesApp.on('notes-delivered', updateGlobalNotes);

    //- Handlers
    function updateNotesList() {
        var allNotes = globalNotes;
        $notesList.empty();
        allNotes.forEach(function(note) {
            var noteTitle = note.body;
            var created = note.created.toISOString().slice(0, 10);
            var noteItem = "<li class='list-group-item noteItem' id='" + note.id + "'>\
                <div class='media-body'>\
                    <strong>" + noteTitle + "</strong><br/>\
                    <p class='float_left'>" + created + "</p><div class='pull-right'>\
                    <span class='icon icon-star-empty pull-right fav'></span>&nbsp;\
                    </div>\
                </div>\
            </li>";
            $notesList.append(noteItem);
        });
    }

    function getNote() {
        var noteId = $(this)[0].id;
        notesApp.emit('note-requested', noteId);
    }

    function renderNote(note) {
        $('#noteContent').val(note.body);
        activeNoteId = note.id;
    }

    function saveNote() {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(saveOnTimeout, timeToSave);
    }

    function createNewNote() {
        activeNoteId = null;
        $('#noteContent').val('');
    }

    function clearSaveTimeout() {
        clearTimeout(typingTimer);
    }

    function assignNoteId(id) {
        noteContent.id = id;
        activeNoteId = id;
    }

    function updateGlobalNotes(notes) {
        globalNotes = notes.rows;
        updateNotesList();
        renderLatestNote();
    }

    function fetchAndRefreshGlobalNotes() {
        notesApp.emit('notes-requested');
    }

    function renderLatestNote() {
        var firstNote = globalNotes[0];
        renderNote(globalNotes[0]);
    }

    function saveOnTimeout() {
        noteContent.body = $contentForm.val();
        noteContent.id = activeNoteId;
        notesApp.emit('save-requested', noteContent)
        $('#savedNotification').fadeIn(1000).delay(3000).fadeOut(600);
        fetchAndRefreshGlobalNotes();
    }

    function initApp() {
        $('#savedNotification').hide();
        fetchAndRefreshGlobalNotes();
    }

    initApp();
}
module.exports = init;
