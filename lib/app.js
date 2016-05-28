var Emitter = require( "events" ).EventEmitter,
    util    = require( "util" ),
    path    = require( "path" ),
    lunr    = require( "lunr" ),
    fs      = require( "fs" ),
    _       = require( "underscore" )._,
    View    = require( "./view" );

var MarkdownPage = require( "./markdown_page" ),
    taskDir      = path.join( __dirname, '../', 'tasks' );


var loadSearchIndex = function( app ) {
    app.searchIndex = lunr(function() {
        this.field("title");
        this.field("body");
        this.ref("id")
    })

    _.each(app.tasks, function( task ) {
        app.searchIndex.add( task );
    })
}


var loadTasks = function() {
    var tasks     = [];
    var taskFiles = fs.readdirSync( taskDir );
    _.each(taskFiles, function( file ) {
        var filePath = path.join( taskDir, file );
        var page = new MarkdownPage( filePath );
        page.id = path.basename( filePath, '.md' );
        tasks.push(page);
    })
    return tasks
}


//- -- App definition.
var App = function() {
    this.tasks = loadTasks();
    loadSearchIndex(this);
    this.on("view-selected", function(viewName) {
        var view = new View(viewName);
        this.emit("rendered", view.toHtml());
    })

    this.on( "task-selected", function( id ) {
        var task = _.find( this.tasks, function( task ) {
            return task.id == id
        });
        this.emit("task-rendered", task);
    } )

    this.on( "search-requested", function( keyword ) {
        var searchResult = null;
        if (/\S/.test(keyword)) {
            var self = this;
            searchResult =  self.searchIndex.search( keyword ).map(function( res ) {
                return _.find( self.tasks, function( task ) {
                    return task.id == res.ref;
                });
            });
        } else {
            searchResult = loadTasks();
        }
        this.emit("search-completed", searchResult);
    });
};

util.inherits(App, Emitter);

function start() {
    return new App();
};

var app = {
    'start': start,
    'loadTasks': loadTasks
}
module.exports = app;