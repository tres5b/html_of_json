import { visit } from '../html_of_json';

function deep_clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

test('Project1', () => {
  var template_p = {
    type: 'p',
    innerHTML: '${content}',
  };

  var template_div = {
    type: 'div',
    id: '${id}',
    innerHTML: [
      {
        type: 'component',
        include: 'template_p.json',
        args: {
          content: '${content1}',
        },
      },
      {
        type: 'component',
        include: 'template_p.json',
        args: {
          content: '${content2}',
        },
      },
    ],
  };

  var root = {
    type: 'div',
    id: 'root',
    innerHTML: [
      {
        type: 'component',
        include: 'template_div.json',
        args: {
          content1: 'hello',
          content2: 'world',
          id: 'div-1',
        },
      },
      {
        type: 'component',
        include: 'template_div.json',
        args: {
          content1: 'How are',
          content2: 'YOU?',
          id: 'div-2',
        },
      },
    ],
  };

  var loader = (file) => {
    switch (file) {
      case 'template_div.json':
        return deep_clone(template_div);
      case 'template_p.json':
        return deep_clone(template_p);
      default: {
      }
    }
  };

  // testing
  var p1 = '<p>hello</p>';
  var p2 = '<p>world</p>';
  var p3 = '<p>How are</p>';
  var p4 = '<p>YOU?</p>';

  var div1 = `<div id="div-1">${p1} ${p2}</div>`;
  var div2 = `<div id="div-2">${p3} ${p4}</div>`;

  var root_component = `<div id="root">${div1} ${div2}</div>`;

  var html = visit(root, loader, {});

  expect(html).toContain(root_component);
});

test('Project2', () => {
  var js = {
    type: 'script',
    src: 'js/${module}.js',
  };

  var css = {
    type: 'link',
    rel: 'stylesheet',
    href: 'css/${style}.css',
  };

  var root = {
    type: 'html',
    innerHTML: [
      {
        type: 'head',
        innerHTML: [
          {
            type: 'component',
            include: 'js.json',
            args: {
              module: 'script1',
            },
          },
          {
            type: 'component',
            include: 'js.json',
            args: {
              module: 'script2',
            },
          },
          {
            type: 'component',
            include: 'css.json',
            args: {
              style: 'style',
            },
          },
        ],
      },
    ],
  };

  var loader = (file) => {
    switch (file) {
      case 'css.json':
        return deep_clone(css);
      case 'js.json':
        return deep_clone(js);
      default:
        return {};
    }
  };

  var html = visit(root, loader, {});

  var js1 = '<script src="js/script1.js" />';
  var js2 = '<script src="js/script2.js" />';
  var css1 = '<link rel="stylesheet" href="css/style.css" />';

  var root_component = `<html><head>${js1} ${js2} ${css1}</head></html>`;

  expect(html).toContain(root_component);
});
