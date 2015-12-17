var React = require('react');

var Foo = React.createClass({

    /**************************************************
     * Component Specs && Lifecycle                   *
     **************************************************/

    propTypes: {
        /**
         * Initial value for Foo component in Foo Bar format.
         * The Foo Bar format is enforced because it's the most reliable way to
         * parse Foos.
         */
        initialValue: fooBarFormat,
        /**
         * Buttons for Foo presets (e.g. "Bar", "Baz"). Each button
         * should have the following properties:
         * - `label` **(required)**: Display text for the button.
         * - `value` **(required)**: The preset Foo or Foo range for the button.
         *   For single mode, this function should return a string in Foo Bar format.
         *   For `range` mode, this function should return an array
         *   of strings in Foo Bar format.
         */
        buttons: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                label: React.PropTypes.string.isRequired,
                value: React.PropTypes.func.isRequired
            })
        ),
        /**
         * Number of Foos to display side by side in the Baz.
         * - Defaults to 2.
         * - Max 2.
         */
        foos: React.PropTypes.oneOf([1, 2]),
        /**
         * The first selectable Foo.
         */
        disableBefore: React.PropTypes.string,
        /**
         * The last selectable Foo.
         */
        disableAfter: React.PropTypes.string,
        /**
         * When a Foo is clicked in the Baz, this callback receives the
         * new selected range as the first argument.
         *
         * The selected range will be an array of 2 Foos, and each Foo in the
         * range is formatted as a Foo Bar Baz.
         */
        onChange: React.PropTypes.func,
        /**
         * User-provided validator function for ranges a user is considering.
         * This prop can be used to implement custom range restrictions. This
         * function will be called with the range in the form of an array.
         *
         * For invalid ranges, this function should return an error message.
         * Otherwise, it should not return anything.
         */
        validate: React.PropTypes.func,
        /**
         * Boolean for whether or not the Baz should include
         * Baz selection dropdowns.
         */
        showBazSelector: React.PropTypes.bool
    },

    statics: {
        FOO_BAR : BAR_BAZ,
        BAZ_FOO : BAR_FOO
    },

    /**************************************************
     * Rendering                                      *
     **************************************************/

    render: function() {
        return (
            <div>Hello World, this is a Foo element.</div>
        );
    }
});

module.exports = Foo;
