/* const { app, BrowserWindow , Menu , MenuItem } = require('electron') */
const electron = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const os = require("os");

const ipc = electron.ipcMain;
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;
const app = electron.app;
const homeDir = os.homedir();
let win;

// uncomment line to activate hot reload
require("electron-reload")(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

const notification = {
  title: "Download completed successfully",
  body: "click open open downloaded file",
  function: function openfile(path) {
    shell.openExternal(path);
  }
};

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 720,
    show: false,
    minWidth: 900,
    backgroundColor: "#ebebeb",
    darkTheme: false,
    icon: path.join(__dirname, "/src/icon.ico"),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      scrollBounce: true,
      overlayFullscreenVideo: false
    }
  });

  /*     win.loadURL(url.format({
    pathname: path.join(__dirname, '/dist/ngapp3/index.html'),
    protocol: 'file',
    slashes: true
})); */

  win.loadURL(`http://localhost:4200`);
  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  // Event when the window is closed.
  win.on("closed", () => {
    win = null;
  });

  win.once("ready-to-show", () => {
    win.show();
  });
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS specific close process
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // macOS specific close process
  if (win === null) {
    createWindow();
  }
});

// when app is ready
app.on("ready", () => {
  // create window
  createWindow();
  // load menu
  Menu.setApplicationMenu(null);

  // load contex-menu
  const menu = new Menu();
  menu.append(
    new MenuItem({
      role: "cut"
    })
  );
  menu.append(
    new MenuItem({
      role: "copy"
    })
  );
  menu.append(
    new MenuItem({
      role: "paste",
      accelerator: ""
    })
  );
  menu.append(
    new MenuItem({
      role: "selectall"
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );

  menu.append(
    new MenuItem({
      role: "reload"
    })
  );
  menu.append(
    new MenuItem({
      role: "forcereload"
    })
  );

  menu.append(
    new MenuItem({
      role: "toggledevtools"
    })
  );
  menu.append(
    new MenuItem({
      type: "separator"
    })
  );
  menu.append(
    new MenuItem({
      label: "Exit",
      role: "close"
    })
  );

  win.webContents.on("context-menu", function(e, params) {
    menu.popup(win, params.x, params.y);
  });
});

// update app handler
require("update-electron-app")({
  repo: "https://github.com/loopteam0/*git repo*",
  // onecheck for updates weeek
  updateInterval: "168 hours"
});
