# html_of_json

**json2html** is a lightweight static site generator and HTML rendering engine based on JSON-defined components. It allows you to describe HTML structures using readable, modular JSON files, and compile them into static HTML pages via a CLI tool or programmatic API.

## Features

- Component-based JSON format with argument substitution
- Static site generation via CLI
- Extensible rendering engine for custom HTML structures
- Designed for future bundling and dynamic DOM generation

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/tres5b/html_of_json.git
cd html_of_json
npm install
```

You can run the CLI directly using `npx` or install it globally:

```bash
npx html_of_json root.json index.html
# or
npm install -g .
html_of_json root.json index.html
```

## CLI Usage

```bash
html_of_json <input-json> [<output>]
```

- `<input-json>`: Path to the root JSON file describing the page
- `<output>`: File to write result HTML page, defaults to console

Example:

```bash
html_of_json root.json index.html
```

This will generate a static HTML file in the `index.html` file.

## API Usage

You can also use the generator programmatically:

```js
import { renderFrom } from 'html_of_json';

// element object to render
var element = {
  type: 'p',
  innerHTML: 'hello, world${bang}',
};

// loader to load new objects (like from JSON file)
var loader = (filename) => {
  return {};
};

// arguments to replace
var args = {
  bang: '!',
};

var res = renderFrom(element, loader, args);

// res == '<p>hello, world!</p>'
if (res == '<p>hello, world!</p>') {
  process.exit(0);
} else {
  process.exit(1);
}
```

## JSON Format

Each component is defined as a JSON object with a `type`, optional attributes, and `innerHTML`. Components can be reused with `include` and parameterized using `args`.

### Basic Element

```json
{
  "type": "div",
  "id": "main-container",
  "class": "container ${extra-class}",
  "innerHTML": ["Hello World"]
}
```

Additional attribues expand to HTML tag attributes and _innerHTML_
is the output between the beginning and closing tag. It accepts
either a list of elements or strings, or if not defined, it
expands to `<tag />`. For additional attributes without value,
for example `{"type": "pre", "readonly": ""}`, this compiles to
`<pre readonly />`, so without attribute value.

### Component Inclusion

```json
{
  "type": "component",
  "include": "components/card.json",
  "args": {
    "title": "Project One",
    "extra-class": "highlight"
  }
}
```

### Included Component (`components/card.json`)

```json
{
  "type": "div",
  "class": "card ${extra-class}",
  "innerHTML": [
    {
      "type": "h3",
      "innerHTML": "${title}"
    }
  ]
}
```

In case an argument is not specified, it expand to an empty string.

## Testing

Run the test suite using:

```bash
npm test
```

Tests are written using [Jest](https://jestjs.io/) and located in the `tests/` directory.

## License

MIT License. See `LICENSE` file for details.
