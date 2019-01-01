import lowdb from 'lowdb';
import { default as FileAsync } from 'lowdb/adapters/FileAsync';

const os = require('os');
const path = require('path');

const dbFileName = 'color-bucket.json';
const dbFilePath = path.join(os.homedir(), dbFileName);

const adapter = new FileAsync(dbFilePath);

const db = lowdb(adapter);

export default db;
