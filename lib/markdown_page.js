var  _           = require( "underscore")._,
    path         = require( "path" ),
    fs           = require( "fs" ),
    gm           = require( "gray-matter" ),
    showdown     = require( "showdown" ),
    converter    = new showdown.Converter();

var MarkdownPage = function( filepath ) {
    var result   = {};
    var raw      = fs.readFileSync( filepath, 'utf-8' );
    var parsed   = gm( raw );
    _.extend( result, parsed.data );
    result.body  = converter.makeHtml( parsed.content );
    return result;
}

module.exports = MarkdownPage;