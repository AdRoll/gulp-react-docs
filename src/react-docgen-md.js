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

var defaultPartials = {
    'catchAll': '{{name}}',
    'func': 'Function',
    'array': 'Array',
    'object': 'Object',
    'string': 'String',
    'number': 'Number',
    'bool': 'Boolean',
    'node': 'ReactNode',
    'element': 'ReactElement',
    'any': '*',
    'custom': '{{raw}} (custom validator)',
    'arrayOf': '[{{> (whichPartial value) value level=level}}, ...]',
    'shape': '{\n\
{{#indent level}}\
{{#each value}}\
    {{@key}}: {{> (whichPartial this) this level=(addLevel ../level)}}\n\
{{/each}}\n\
}\
{{/indent}}',
    'enum': '(\
{{#each value}}\
{{this.value}}{{#unless @last}}|{{/unless}}\
{{/each}}\
)',
    'union': '(\
{{#each value}}\
{{> (whichPartial this) this level=../level}}{{#unless @last}}|{{/unless}}\
{{/each}}\
)',
    'imports': '\
{{#if srcLink }}From [`{{srcLink}}`]({{srcLink}})\n\n\{{/if}}\
',
    'document': '\
## {{componentName}}\n\n\
{{> imports }}\
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
<br><br>\n',
};
var defaultHelpers = {
    'whichPartial': function(type) {
        var partials = [
            'any', 'array', 'arrayOf', 'bool', 'custom', 'element', 'enum', 'func',
            'node', 'number', 'object', 'shape', 'string', 'union'
        ];
        return type && _.contains(partials, type.name) ? type.name : 'catchAll';
    },
    'addLevel': function(level) {
        return level + 1;
    },
    'indent': function(indentLevel, options) {
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
    },
};


/********************************************************
 * Documentation generator using react-docgen           *
 ********************************************************/

function merge(defaults, overrides) {
    var merged = {};
    Object.keys(defaults).forEach(function (key) {
        merged[key] = defaults[key];
    });
    Object.keys(overrides).forEach(function (key) {
        merged[key] = overrides[key];
    });
    return merged;
}

var reactDocgenMarkdown = function(componentSrc, options, templates) {
    var docs = reactDocs.parse(componentSrc);

    var partialsOverride = templates.partials || {};
    var helpersOverride = templates.helpers || {};

    var mergedPartials = merge(defaultPartials, partialsOverride);
    Object.keys(mergedPartials).forEach(function (key) {
        var override = key in partialsOverride;
        console.log('compiling partial:', key, ' - ', override ? 'override' : 'default');
        Handlebars.registerPartial(key, mergedPartials[key]);
    });

    var mergedHelpers = merge(defaultHelpers, helpersOverride);
    Object.keys(mergedHelpers).forEach(function (key) {
        var override = key in helpersOverride;
        console.log('compiling helper:', key, ' - ', override ? 'override' : 'default');
        Handlebars.registerHelper(key, mergedHelpers[key]);
    });

    console.log('compiling template: document');
    var reactDocgenTemplate = Handlebars.compile('{{> document data }}');
    return reactDocgenTemplate({
        data: {
            relativePath    : options.relativePath,
            srcLink         : options.srcLink,
            componentName   : options.componentName,
            description     : docs.description,
            props           : sortObjectByKey(docs.props)
        },
    });
};

module.exports = reactDocgenMarkdown;
