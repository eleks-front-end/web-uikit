# Contribution Guideline

## Rules

- Code must be formatted according to the [ES6 StyleGuide by ELEKS](https://cd.eleks.com/display/SDO/Coding+standards).
- Always write [tests](https://mochajs.org/)! It's better to develop in the test-driven way.

## Commands

`$ npm start` to start developing. This command compiles the scripts and watches for file changes.

`$ npm run build` to build the assets for production and launch a local test web server for preview.

`$ npm test` to lint the scripts and run unit tests.

## Directory structure
- `src` contains the source code.
  - `src/html` for static HTML documents.
  - `src/js` for ES6 javascript source code.
  - `src/styles` for stylus files.
  - `src/svg` for SVG images.
- `dist` contains the compiled code.
- `test` contains the unit test spec files.
