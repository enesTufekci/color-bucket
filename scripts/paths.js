const path = require('path');
const fs = require('fs');

const ROOT = fs.realpathSync(process.cwd());

const RENDERER_DIR = path.join(ROOT, 'src', 'renderer');
const RENDERER_ENTRY = path.join(RENDERER_DIR, 'index.tsx');
const MAIN_DIR = path.join(ROOT, 'src', 'main');
const MAIN_ENTRY = path.join(MAIN_DIR, 'index.ts');
const RESOURCES = path.join(ROOT, 'resources');
const RESOURCES_MAC = path.join(RESOURCES, 'mac');
const RESOURCES_PLIST = path.join(RESOURCES, 'Info.plist');
const NODE_MODULES = path.join(ROOT, 'node_modules');
const PACKAGE_JSON = path.join(ROOT, 'package.json');
const DIST = path.join(ROOT, 'dist');
const DIST_MAIN = path.join(DIST, 'main.js');
const APP_CONFIG = path.join(ROOT, 'app.json');
const SRC = path.join(ROOT, 'src');
module.exports = {
  ROOT,
  RENDERER_DIR,
  RENDERER_ENTRY,
  MAIN_DIR,
  MAIN_ENTRY,
  DIST,
  DIST_MAIN,
  RESOURCES,
  RESOURCES_MAC,
  RESOURCES_PLIST,
  NODE_MODULES,
  PACKAGE_JSON,
  APP_CONFIG,
  SRC
};
