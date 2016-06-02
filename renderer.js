// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var appEngine = require("./lib/main");
var app = appEngine.start();

(function initMain() {
    app.on("rendered",  function(rendered) {
      $("#main").html(rendered)
    });
    var loadView = function(viewName) {
      app.emit("view-selected", viewName);
    };
    $(function() {
      loadView("notes");
      $(".navHolder").on('click', '.nav', function(event) {
        $(".navHolder").find("a").removeClass('activePage');
        $(this).find("a").addClass('activePage');
        loadView(this.id);
      });
    });
})();
