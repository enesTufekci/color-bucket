import { app, BrowserWindow, ipcMain, clipboard } from 'electron';
import * as path from 'path';
import * as url from 'url';
import db from '../db';

let win: BrowserWindow | null;

const PORT = 4455;

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

console.log(process.env.NODE_ENV);

const createWindow = async () => {
  const DB = await db;
  DB.defaults({ projects: [] }).write();
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions();
  }

  win = new BrowserWindow({ width: 800, height: 600 });

  if (process.env.NODE_ENV !== 'production') {
    win.loadURL(`http://localhost:${PORT}`);
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
      })
    );
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools
    win.webContents.openDevTools();
  }

  win.on('closed', () => {
    win = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});
