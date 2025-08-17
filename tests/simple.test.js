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
