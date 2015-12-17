<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
# React Component Reference

- [Baz](#baz)
- [Foo](#foo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Baz

From [`../components/Baz.jsx`](../components/Baz.jsx)

#### bazActions

```js
bazActions: Function
```

A function that when given a data item returns a list of possible actions
that can be taken for that item. if no `bazActions` are given, then no
actions will be shown. This function should return an array of either
a visual divider between action options **OR** objects with a `type` and
`label`.

#### bazClassNames

```js
bazClassNames: (String|Function)
```

CSS class(es) to add to a Baz. Can be a string or a function. If this
prop is a string, the class(es) will be attached to all Bazzes in the Foo.
If it is a function, the function will be called with the data item
to be rendered in the Baz and the classes returned will be applied
to that item's Baz when rendered. In the case of a function the return
value is expected to a string of space-separated classes.

#### columns

```js
columns: [{
    key: String
    label: String
    accessor: Function
    render: Function
    widthMultiplier: Number
}, ...]
```

The columns you want the Foo to have. Each column can have the
following attributes:
- `key` **(required)**: column identifier
- `label` **(required)**: Display text for the column. Should alread be
  translated when passed to the Foo.
- `accessor` **(required)**: Function that returns relevant value from a
  given data item. Later fed to the column `render` function.
- `render`: Function that takes the output of `accessor` and returns
  what should be rendered for a given data item in that column. Should
  return either a formatted value or can also be html. Columns without
  `render` functions will not be displayed but can be used for filtering
  (see the `filters` prop for more information).
- `widthMultiplier`: Number to multiply the width of the column relative
  to other columns. By default, all columns are of equal width.

#### data

```js
// Required
data: Array
```

Array of data items. These data items can take whatever form or have
whatever attributes you'd like. As long as the column.accessor and
column.render functions accounts for the form or attributes of your
data items.

#### filters

```js
filters: [{
    columnKey: String
    options: [{
        value: String
        label: String
    }, ...]
    defaultValue: String
    filterCb: Function
    value: String
}, ...]
```

An array of filters you want the Foo to have. When no filters are
given, no filter dropdowns will be shown. A filter object can have the
following properties:
- `columnKey` **(required)**: The key of the column in the `columns`
  array the filter will do the filtering on.
- `options`: An array of options to display in the filter dropdown. Each
  option is required to have a `value` and `label`.
- `defaultValue` **(required)**: A default value to render the filter with.
  Should match one of the values in the `options` array.
- `filterCb` **(required)**: The predicate function used to filter the
  items in the Foo when a selection for this filter is made. The `Foo`
  will call this function with the option `value` as the first argument, and
  the value of each data item (as they're being filtered) as the second
  argument. The value of the data item is determined using the corresponding
  columns (using `columnKey`) `accessor` function.
- `value`: Given value to the assign to the filter. If not given, this filter's
  `defaultValue` will be used.

#### maxConfigOptions

```js
// Default: 6
maxConfigOptions: 
```

#### onFilter

```js
// Default: _.noop
onFilter: 
```

#### onSearch

```js
// Default: _.noop
onSearch: 
```

#### onSort

```js
// Default: _.noop
onSort: 
```

#### searchColumns

```js
searchColumns: [String, ...]
```

An array of column keys that designate which columns the search should
look for matches in. When no search columns are given, the search field
is not shown in the Foo.

#### searchQuery

```js
searchQuery: String
```

The initial search query. Tokenized based on spaces in the string.

#### secondaryInfo

```js
secondaryInfo: ReactElement
```

A React element that renders and controls secondary info.
This could be bulk action buttons, non-actionable information, etc.
Will be rendered to the right of the search and filters.

<br><br>

## Foo

From [`../components/Foo.jsx`](../components/Foo.jsx)

#### buttons

```js
buttons: [{
    label: String
    value: Function
}, ...]
```

Buttons for Foo presets (e.g. "Bar", "Baz"). Each button
should have the following properties:
- `label` **(required)**: Display text for the button.
- `value` **(required)**: The preset Foo or Foo range for the button.
  For single mode, this function should return a string in Foo Bar format.
  For `range` mode, this function should return an array
  of strings in Foo Bar format.

#### disableAfter

```js
disableAfter: String
```

The last selectable Foo.

#### disableBefore

```js
disableBefore: String
```

The first selectable Foo.

#### foos

```js
foos: (1|2)
```

Number of Foos to display side by side in the Baz.
- Defaults to 2.
- Max 2.

#### initialValue

```js
initialValue: fooBarFormat (custom validator)
```

Initial value for Foo component in Foo Bar format.
The Foo Bar format is enforced because it's the most reliable way to
parse Foos.

#### onChange

```js
onChange: Function
```

When a Foo is clicked in the Baz, this callback receives the
new selected range as the first argument.

The selected range will be an array of 2 Foos, and each Foo in the
range is formatted as a Foo Bar Baz.

#### showBazSelector

```js
showBazSelector: Boolean
```

Boolean for whether or not the Baz should include
Baz selection dropdowns.

#### validate

```js
validate: Function
```

User-provided validator function for ranges a user is considering.
This prop can be used to implement custom range restrictions. This
function will be called with the range in the form of an array.

For invalid ranges, this function should return an error message.
Otherwise, it should not return anything.

<br><br>
