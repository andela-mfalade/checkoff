var fs         = require("fs"),
    path       = require("path"),
    handlebars = require("handlebars");


var View = function(viewName) {

    // The file should be in the root of the app.
    var templatePath = path.join(__dirname, "../views", viewName + ".hbs"),
        source       = fs.readFileSync(templatePath, 'utf-8'),
        template     = handlebars.compile(source);

        this.toHtml  = function (data) {
            return template(data);
        };
}

module.exports = View;