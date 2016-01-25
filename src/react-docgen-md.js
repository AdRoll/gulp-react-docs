var _ = require('lodash'),
    reactDocs = require('react-docgen'),
    Handlebars = require('handlebars');

/********************************************************
 * Helpers                                              *
 ********************************************************/

var sortObjectByKey = function(obj){
    return _(obj).keys().sort().reduce(function(memo, key) {
        memo[key] = obj[key];
        return memo;
    }, {});
};

/********************************************************
 * Prop type partials and handblebars helpers           *
 ********************************************************/

Handlebars.registerPartial('catchAll', '{{name}}');

// Basic prop types
Handlebars.registerPartial('func', 'Function');
Handlebars.registerPartial('array', 'Array');
Handlebars.registerPartial('object', 'Object');
Handlebars.registerPartial('string', 'String');
Handlebars.registerPartial('number', 'Number');
Handlebars.registerPartial('bool', 'Boolean');
Handlebars.registerPartial('node', 'ReactNode');
Handlebars.registerPartial('element', 'ReactElement');
Handlebars.registerPartial('any', '*');
Handlebars.registerPartial('custom', '{{raw}} (custom validator)');

// composed prop types
Handlebars.registerPartial('arrayOf', '[{{> (whichPartial value) value level=level}}, ...]');

Handlebars.registerPartial('shape', '{\n\
{{#indent level}}\
{{#each value}}\
    {{@key}}: {{> (whichPartial this) this level=(addLevel ../level)}}\n\
{{/each}}\n\
}\
{{/indent}}');

Handlebars.registerPartial('enum', '(\
{{#each value}}\
{{this.value}}{{#unless @last}}|{{/unless}}\
{{/each}}\
)');

Handlebars.registerPartial('union', '(\
{{#each value}}\
{{> (whichPartial this) this level=../level}}{{#unless @last}}|{{/unless}}\
{{/each}}\
)');

// Partial helper. Tells us which partial to use based on the "propType" name
Handlebars.registerHelper('whichPartial', function(type) {
    var partials = [
        'any', 'array', 'arrayOf', 'bool', 'custom', 'element', 'enum', 'func',
        'node', 'number', 'object', 'shape', 'string', 'union'
    ];
    return type && _.contains(partials, type.name) ? type.name : 'catchAll';
});

Handlebars.registerHelper('name', function(componentName, displayName) {
  return displayName || componentName;
});
/********************************************************
 * General helpers                                      *
 ********************************************************/

// math helper
Handlebars.registerHelper('addLevel', function(level) { return level + 1; });

// loop helper
Handlebars.registerHelper('indent', function(indentLevel, options) {
    var content = options.fn(this),
        lines = content.split('\n'),
        indentString = '';

    // build the indent string we need for this indent level
    for (var i = 0; i < indentLevel; i++) {
        indentString += '    ';
    }

    // add then indents to each line
    lines = lines.map(function(line) { return line = indentString + line; });
    return lines.join('\n');
});

Handlebars.registerHelper('each_with_sort', function(obj, opts) {
    return _(obj).keys().sort().reduce(function(s, key) {
        return s + opts.fn({ key: key, value: obj[key]});
    }, '');
});

/********************************************************
 * Top-level handlebars template                        *
 ********************************************************/

var reactDocgenTemplate = Handlebars.compile('\
## {{componentName}}\n\n\
{{#if srcLink }}From [`{{srcLink}}`]({{srcLink}})\n\n\{{/if}}\
{{#each components}}\
{{#if this.displayName}}### {{this.displayName}}\n\n\{{/if}}\
{{#if this.description}}{{{this.description}}}\n\n{{/if}}\
{{#each_with_sort this.props}}\
#### {{key}}\n\n\
```js\n\
{{#if value.required}}// Required\n{{/if}}\
{{#if value.defaultValue}}// Default: {{{value.defaultValue.value}}}\n{{/if}}\
{{key}}: {{> (whichPartial value.type) value.type level=0}}\n\
```\n\n\
{{#if value.description}}{{{value.description}}}\n\n{{/if}}\
{{/each_with_sort}}\
<br><br>\n\
{{/each}}');

/********************************************************
 * Documentation generator using react-docgen           *
 ********************************************************/

var reactDocgenMarkdown = function(componentSrc, options) {
    var docs = reactDocs.parse(componentSrc,options.resolver);
    if (!docs instanceof Array) {
      docs = [docs];
    }
    return reactDocgenTemplate({
        srcLink         : options.srcLink,
        componentName   : options.componentName,
        components      : docs
    });
};

module.exports = reactDocgenMarkdown;
