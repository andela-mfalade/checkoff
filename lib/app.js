var Emitter = require("events").EventEmitter,
    util = require("util"),
    path = require("path"),
    fs = require("fs"),
    View = require("./view");

var App = function() {
    this.on("view-selected", function(viewName) {
        var view = new View(viewName);
        this.emit("rendered", view.toHtml());
    })
};

util.inherits(App, Emitter);
module.exports = new App();