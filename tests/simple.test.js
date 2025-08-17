import { visit } from '../html_of_json';

test('Simple div', () => {
  var div = {
    type: 'div',
    class: 'container simple-container',
    innerHTML: 'hello world!',
  };

  var html = visit(
    div,
    () => {
      return {};
    },
    {},
  );

  expect(html).toContain(
    '<div class="container simple-container">hello world!</div>',
  );
});

test(`Simple replacement`, () => {
  var div = {
    type: 'div',
    class: '${classname}',
    innerHTML: '${content}',
  };

  var args = {
    classname: 'container',
    content: 'Hello World!',
  };

  var html = visit(
    div,
    () => {
      return {};
    },
    args,
  );

  expect(html).toContain('<div class="container">Hello World!</div>');
});

test(`Charset meta`, () => {
  var meta = {
    type: 'meta',
    charset: 'UTF-8',
  };

  var html = visit(
    meta,
    () => {
      return {};
    },
    {},
  );

  expect(html).toContain('<meta charset="UTF-8" />');
});

test(`<p> tag`, () => {
  var e = {
    type: 'p',
    innerHTML: 'hello, world',
  };

  var html = visit(
    e,
    () => {
      return {};
    },
    {},
  );

  expect(html).toContain('<p>hello, world</p>');
});

test(`Stylesheet`, () => {
  var style = {
    type: 'link',
    rel: 'stylesheet',
    href: 'style.css',
  };

  var html = visit(
    style,
    () => {
      return {};
    },
    {},
  );

  expect(html).toContain('<link rel="stylesheet" href="style.css" />');
});
