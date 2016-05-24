var fs         = require("fs"),
    path       = require("path"),
    jade = require("jade");


var View = function(viewName) {

    // The file should be in the root of the app.
    var templatePath = path.join(__dirname, "../templates", viewName + ".jade"),
        source       = fs.readFileSync(templatePath, 'utf-8'),
        template     = jade.compile(source);

        this.toHtml  = function (data) {
            return template(data);
        };
}

module.exports = View;