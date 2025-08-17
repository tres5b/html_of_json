#!/usr/bin/env node

import { render } from '../index.js';
import fs from 'fs';

function help() {
  console.log('Usage: html_of_json [--help] <root component> [<out>]\n');
  console.log('    --help            Display this help message.');
  console.log('    <root component>  JSON file with entrypoint.');
  console.log(
    '    <out>             File to write the result. Default print to console.',
  );
}

var arg = process.argv[2];

if (typeof arg == 'undefined' || arg == '--help') {
  help();
  process.exit(0);
}

// else render
var res = render(arg);

var outp = process.argv[3];

if (typeof outp == 'undefined') {
  console.log('\nOutput:\n');
  console.log(res);
  console.log('\n');
  process.exit(0);
}

// else print to file
fs.writeFileSync(outp, res);
