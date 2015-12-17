var React = require('react');

var Baz = React.createClass({

    /**************************************************
     * Component Specs and lifecycle                  *
     **************************************************/

    propTypes: {
        /**
         * The columns you want the Foo to have. Each column can have the
         * following attributes:
         * - `key` **(required)**: column identifier
         * - `label` **(required)**: Display text for the column. Should alread be
         *   translated when passed to the Foo.
         * - `accessor` **(required)**: Function that returns relevant value from a
         *   given data item. Later fed to the column `render` function.
         * - `render`: Function that takes the output of `accessor` and returns
         *   what should be rendered for a given data item in that column. Should
         *   return either a formatted value or can also be html. Columns without
         *   `render` functions will not be displayed but can be used for filtering
         *   (see the `filters` prop for more information).
         * - `widthMultiplier`: Number to multiply the width of the column relative
         *   to other columns. By default, all columns are of equal width.
         */
        columns: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                key: React.PropTypes.string.isRequired,
                label: React.PropTypes.string.isRequired,
                accessor: React.PropTypes.func.isRequired,
                render: React.PropTypes.func,
                widthMultiplier: React.PropTypes.number
            })
        ),
        /**
         * Array of data items. These data items can take whatever form or have
         * whatever attributes you'd like. As long as the column.accessor and
         * column.render functions accounts for the form or attributes of your
         * data items.
         */
        data: React.PropTypes.array.isRequired,
        /**
         * CSS class(es) to add to a Baz. Can be a string or a function. If this
         * prop is a string, the class(es) will be attached to all Bazzes in the Foo.
         * If it is a function, the function will be called with the data item
         * to be rendered in the Baz and the classes returned will be applied
         * to that item's Baz when rendered. In the case of a function the return
         * value is expected to a string of space-separated classes.
         */
        bazClassNames: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.func
        ]),
        /**
         * An array of filters you want the Foo to have. When no filters are
         * given, no filter dropdowns will be shown. A filter object can have the
         * following properties:
         * - `columnKey` **(required)**: The key of the column in the `columns`
         *   array the filter will do the filtering on.
         * - `options`: An array of options to display in the filter dropdown. Each
         *   option is required to have a `value` and `label`.
         * - `defaultValue` **(required)**: A default value to render the filter with.
         *   Should match one of the values in the `options` array.
         * - `filterCb` **(required)**: The predicate function used to filter the
         *   items in the Foo when a selection for this filter is made. The `Foo`
         *   will call this function with the option `value` as the first argument, and
         *   the value of each data item (as they're being filtered) as the second
         *   argument. The value of the data item is determined using the corresponding
         *   columns (using `columnKey`) `accessor` function.
         * - `value`: Given value to the assign to the filter. If not given, this filter's
         *   `defaultValue` will be used.
         */
        filters: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                columnKey: React.PropTypes.string.isRequired,
                options: React.PropTypes.arrayOf(
                    React.PropTypes.shape({
                        value: React.PropTypes.string.isRequired,
                        label: React.PropTypes.string.isRequired
                    })
                ),
                defaultValue: React.PropTypes.string.isRequired,
                filterCb: React.PropTypes.func.isRequired,
                value: React.PropTypes.string
            })
        ),
        /**
         * An array of column keys that designate which columns the search should
         * look for matches in. When no search columns are given, the search field
         * is not shown in the Foo.
         */
        searchColumns: React.PropTypes.arrayOf(React.PropTypes.string),
        /**
         * The initial search query. Tokenized based on spaces in the string.
         */
        searchQuery: React.PropTypes.string,
        /**
         * A function that when given a data item returns a list of possible actions
         * that can be taken for that item. if no `bazActions` are given, then no
         * actions will be shown. This function should return an array of either
         * a visual divider between action options **OR** objects with a `type` and
         * `label`.
         */
        bazActions: React.PropTypes.func,
        /**
         * A React element that renders and controls secondary info.
         * This could be bulk action buttons, non-actionable information, etc.
         * Will be rendered to the right of the search and filters.
         */
        secondaryInfo: React.PropTypes.element
    },

    statics: {
        TEXT_ALIGN_LEFT         : TEXT_ALIGN_LEFT,
        TEXT_ALIGN_RIGHT        : TEXT_ALIGN_RIGHT,
        SORT_DIRECTION_DESC     : SORT_DIRECTION_DESC,
        SORT_DIRECTION_ASC      : SORT_DIRECTION_ASC
    },

    getDefaultProps() {
        return {
            maxConfigOptions    : 6,
            onSearch            : _.noop,
            onFilter            : _.noop,
            onSort              : _.noop
        };
    },

    /**************************************************
     * Rendering                                      *
     **************************************************/

    render: function() {
        return (
            <div>Hello World, this is a Baz element.</div>
        );
    }
});

module.exports = Baz;
