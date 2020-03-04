// external dependencies
var through = require('through2'),
    path = require('path');

// internal dependencies
var reactDocgenMarkdown = require('./src/react-docgen-md');

module.exports = function(options) {
    options = options || {};
    
    return through.obj(function(file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            throw new Error('Streams not supported!')

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
                componentName   : file.relative.replace(file.extname, ''),
                srcLink         : srcLink
            });
            
            // replace the file contents and extension
            file.contents = Buffer.from(markdownDoc);
            file.path = file.path.replace(file.extname, '.md');

            return cb(null, file);
        }
    });
};
