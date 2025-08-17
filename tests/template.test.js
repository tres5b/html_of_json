import { visit } from '../html_of_json';

test('Simple div template', () => {
  var template = {
    type: 'div',
    class: '${class_name}',
    innerHTML: ['${innerHTML}', { type: 'br' }, 'Hello!'],
  };

  var args = {
    class_name: 'hidden',
    innerHTML: 'Is here someone?',
  };

  var e = {
    type: 'component',
    include: 'div.json',
    args: args,
  };

  var html = visit(
    e,
    (key) => {
      if (key == 'div.json') {
        return template;
      }

      return {};
    },
    {},
  );

  expect(html).toContain(
    '<div class="hidden">Is here someone? <br /> Hello!</div>',
  );
});

test(`No args`, () => {
  var template = {
    type: 'p',
    innerHTML: '${content}',
  };

  var e = {
    type: 'component',
    include: 'p.json',
    args: {},
  };

  var html = visit(
    e,
    (path) => {
      if (path == 'p.json') {
        return template;
      }

      return {};
    },
    { content: 'ignore' },
  );

  expect(html).toContain('<p></p>');
});

test(`Override args`, () => {
  var template = {
    type: 'p',
    innerHTML: '${content}',
  };

  var e = {
    type: 'component',
    include: 'p.json',
    args: { content: 'hello' },
  };

  var html = visit(
    e,
    (path) => {
      if (path == 'p.json') {
        return template;
      }

      return {};
    },
    { content: 'ignore' },
  );

  expect(html).toContain('<p>hello</p>');
});

test(`Multi usage`, () => {
  var template = {
    type: 'script',
    src: '${source}',
    innerHTML: '',
  };

  var head = {
    type: 'head',
    innerHTML: [
      {
        type: 'component',
        include: 'script.json',
        args: {
          source: 'script1.js',
        },
      },
      {
        type: 'component',
        include: 'script.json',
        args: {
          source: 'script2.js',
        },
      },
      {
        type: 'component',
        include: 'script.json',
        args: {
          source: 'script3.js',
        },
      },
    ],
  };

  var html = visit(
    head,
    (key) => {
      if (key == 'script.json') {
        // stringify and parse since expecting
        // to read a file every time.
        //
        // if returning the object, this fails
        // because the template object itself
        // gets modified.
        return JSON.parse(JSON.stringify(template));
      }

      return {};
    },
    {},
  );

  expect(html).toContain(
    '<head><script src="script1.js"></script> <script src="script2.js"></script> <script src="script3.js"></script></head>',
  );
});
