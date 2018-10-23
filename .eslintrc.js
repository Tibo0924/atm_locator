module.exports = {
  env: {
    browser: true,
  },
  extends: [
		'airbnb',
		'react-app',
  ],
  settings: {
    'import/resolver': {
      webpack: {
        config: 'config/webpack.config.dev.js',
      },
    },
  },
  rules: {
    // Set indent of 2 spaces, also indent "case" of 2 spaces with respect to "switch" statements
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    // Allow the use of "debugger" as they're discarded during production build
    'no-debugger': 'off',
    // Do not allow more than 1 empty line
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    // Allow unary operators "++"" and "--" in the afterthought (final expression) of a "for" loop
    'no-plusplus': ['error', { 'allowForLoopAfterthoughts': true }],
    // Disallow dangling underscores in identifiers, unless it's an allowed one
    'no-underscore-dangle': ['error', { 'allow': ['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__', '_error'] }],
    // Do not force the use of "static" methods within classes, allow to have methods that don't use "this"
    'class-methods-use-this': 'off',
    // Set maximum length of lines to 120 characters, but ignore strings and regular expression literals
    'max-len': ['error', 120, { 'ignoreStrings': true, 'ignoreRegExpLiterals': true }],
    // Found it is not always 'cleaner' in that way
    'no-lonely-if': 'off',
    // Do not force to always have default export
    'import/prefer-default-export': 'off',
    // Do not force to always use stateless function
    'react/prefer-stateless-function': 'off',
    // Allow the use of less specific prop types, such as "any", "array", "object"
    'react/forbid-prop-types': 'off',
    // Do not force buttons to have type set - it will default to "submit"
    'react/button-has-type': 'off',
    // Set indent of 2 spaces (including props) for JSX
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    // Allow JSX to be coded only in files with ".js" extension
    'react/jsx-filename-extension': ['warn', { 'extensions': ['.js'] }],
    // Allow having labels without associated control
    'jsx-a11y/label-has-for': 'off',
    // Do not require interactive elements to be focusable
    'jsx-a11y/interactive-supports-focus': 'off',
    // Do not force non-interactive elements with click handlers to have keyboard listeners
    'jsx-a11y/click-events-have-key-events': 'off',
  },
};