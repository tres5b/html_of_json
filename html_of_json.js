// html renderer

export function visit(obj, loader, args) {
  if (typeof obj == 'string') {
    return obj.replace(/\$\{([^]+)\}/g, (_, key) => args[key] ?? '');
  }

  // else handle object

  // test if can replace arguments
  for (const key in obj) {
    if (typeof obj[key] == 'string') {
      // try to replace
      obj[key] = obj[key].replace(/\$\{([^]+)\}/g, (_, key) => args[key] ?? '');
    }
  }

  // handle component
  if (obj.type == 'component') {
    return handle_component(obj, loader);
  }

  // else create html
  var tag = obj.type;
  var innerHTML = obj.innerHTML;

  var res = `<${tag}`;

  for (const key in obj) {
    switch (key) {
      case 'type':
      case 'innerHTML':
        continue;
      default: {
        res += ` ${key}="${obj[key]}"`;
      }
    }
  }

  if (typeof innerHTML == 'undefined') {
    res += ' />';
    return res;
  }

  if (typeof innerHTML == 'string') {
    res += `>${innerHTML}</${tag}>`;
    return res;
  }

  // else handle all elements in innerHTML
  res += '>';
  for (const e in innerHTML) {
    res += visit(innerHTML[e], loader, args);
  }

  res += `</${tag}>`;
  return res;
}

function handle_component(obj, loader) {
  var args = obj.args ?? {};
  var n_obj = loader(obj.include);
  return visit(n_obj, loader, args);
}
