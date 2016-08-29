// external dependencies
var gUtil = require('gulp-util'),
    PluginError = gUtil.PluginError,
    through = require('through2'),
    path = require('path');

// internal dependencies
var reactDocgenMarkdown = require('./src/react-docgen-md');

// consts
var PLUGIN_NAME = 'gulp-react-docs';

module.exports = function(options) {
    options = options || {};

    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            this.emit('error', new PluginError(PLUGIN_NAME, 'Streams not supported!'));

        } else if (file.isBuffer()) {

            // figure out where the component headings in the markdown doc
            // should link to
            var pathToSrc = options.path,
                srcLink;

            switch (typeof pathToSrc) {
                case 'string':
                    pathToSrc = path.resolve(pathToSrc);
                    srcLink = path.relative(pathToSrc, file.path);
                    break;
                case 'function':
                    srcLink = pathToSrc(file.path);
                    break;
                default:
                    srcLink = '';
            }

            // get the markdown documentation for the file
            var markdownDoc = reactDocgenMarkdown(file.contents, {
                componentName   : gUtil.replaceExtension(file.relative, ''),
                relativePath    : file.relative,
                srcLink         : srcLink
            }, options.templates || {});

            // replace the file contents and extension
            file.contents = new Buffer(markdownDoc);
            file.path = gUtil.replaceExtension(file.path, '.md');

            return cb(null, file);
        }
    });
};
