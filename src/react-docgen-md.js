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
    return type && _.includes(partials, type.name) ? type.name : 'catchAll';
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

/********************************************************
 * Top-level handlebars template                        *
 ********************************************************/

var reactDocgenTemplate = Handlebars.compile('\
## {{componentName}}\n\n\
{{#if srcLink }}From [`{{srcLink}}`]({{srcLink}})\n\n\{{/if}}\
{{#if description}}{{{description}}}\n\n{{/if}}\
{{#each props}}\
#### {{@key}}\n\n\
```js\n\
{{#if this.required}}// Required\n{{/if}}\
{{#if this.defaultValue}}// Default: {{{this.defaultValue.value}}}\n{{/if}}\
{{@key}}: {{> (whichPartial this.type) this.type level=0}}\n\
```\n\n\
{{#if this.description}}{{{this.description}}}\n\n{{/if}}\
{{/each}}\
<br><br>\n');

/********************************************************
 * Documentation generator using react-docgen           *
 ********************************************************/

var reactDocgenMarkdown = function(componentSrc, options) {
    var docs = reactDocs.parse(componentSrc);
    return reactDocgenTemplate({
        srcLink         : options.srcLink,
        componentName   : options.componentName,
        description     : docs.description,
        props           : sortObjectByKey(docs.props)
    });
};

module.exports = reactDocgenMarkdown;
