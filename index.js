import { visit } from './html_of_json.js';
import fs from 'fs';

function load_component(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

export function render(filePath) {
  var root = load_component(filePath);
  return visit(root, load_component, {});
}
