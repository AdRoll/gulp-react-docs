# gulp-react-docs

A [gulp](http://gulpjs.com/) plugin for generating documentation in Markdown format for React components based on their `propTypes`. The plugin uses [react-docgen](https://github.com/reactjs/react-docgen) to extract component prop information, and then render the markdown using [handlebars](http://handlebarsjs.com/).

This plugin is an extension of the automatic documentation generation tool we use at [AdRoll](http://tech.adroll.com) for our reusable component library as written about [here](http://tech.adroll.com/blog/frontend/2015/11/12/rollup-react-and-npm-at-adroll.html#automatic-documentation-generation).

## Installation

Install package with [npm](http://npmjs.org/) and add it to your development dependencies:

`npm install gulp-react-docs --save-dev`

## Information

<table>
<tr>
<td>Package</td><td>gulp-react-docs</td>
</tr>
<tr>
<td>Description</td>
<td>Generates Markdown documentation for React components based on component `propTypes`.</td>
</tr>
<tr>
<td>Node Version</td>
<td>>= 10</td>
</tr>
</table>

## Usage

```js
var gulpReactDocs = require('gulp-react-docs');

gulp.task('react-docs', function() {
    var docsDest = 'docs';

    return gulp.src('./components/**/*.jsx')
        .pipe(gulpReactDocs({
            path: docsDest
        }))
        .pipe(gulp.dest(docsDest));
});
```

For example usage, see our example `gulpfile.js` [here](./example/gulpfile.js).

For example output, see the generated docs [example/docs](./example/docs) generated from the files in [example/components](./example/components).

### Options
The `gulp-react-docs` plugin can take an `options` object. The following attributes may be passed as part of the `options` object:

#### path

* Type: `string` OR `function`
* Default: `undefined`

The path specifying the destination directory for your generated documentation files. This option is used to generate links from the output `.md` files to the source code. See the link produced below the heading [here](./example/docs/README.md#baz) for an example. If this option is not given, the link to the source code will not be generated. The `path` can be either a string or a function.

If you pass in a string, `path` should be the relative path from the `gulpfile.js` using the `gulp-react-docs` plugin to where the generated documentation will be output. The `path` will then be used to generate the relative path from the output documentation to the source code.

If you pass in a function, `path` is expected to return a string. The return value can be either a relative from where the generated documentation will be output to the source code, or an absolute path / URL pointing to the source code.

## Contributors

- [@marsjosephine](https://github.com/marsjosephine)
- [@jtuulos](https://github.com/jtuulos)
- [@jgrist](https://github.com/jgrist)
