# gulp-react-docs Change Log

## 0.1.3 (2017-12-13)

Upgraded `react-docgen` to `^2.20.0`. Fixes https://github.com/AdRoll/gulp-react-docs/issues/7

## 0.1.2 (2016-07-14)

Make the `options` argument optional and make `gulp-util` a production dependency (https://github.com/AdRoll/gulp-react-docs/pull/4)

## 0.1.1 (2016-04-08)

Pinned `react-docgen` dependency to version `2.7.0`. This prevents backwards incompatible changes in `react-docgen@2.8.0` from breaking this package.

## 0.1.0 (2015-12-17)

Initial publication of the `gulp-react-docs` plugin. The gulp plugin uses `react-docgen@2.4.0` and generates documentation for React components and the `propTypes` they expect. The plugin takes the following options at the moment:

- `path`: If given, a link from the generated `.md` doc to the source code / file will be included in the generated output. See the repo [README.md](./README.md) for more information.
