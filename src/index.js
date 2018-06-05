const {app, BrowserWindow} = require('electron');
const ArgumentParser = require("argparse").ArgumentParser;
const url = require('url');
const path = require('path');

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

let args;
let parser = new ArgumentParser({
    version: require("../package").version,
    addHelp: true,
    description: require("../package").description,
    prog: require("../package.json").name
});

parser.addArgument(
    ['-d', '--debug'],
    {help: 'Active le mode debug.', defaultValue: false, action: "storeTrue"}
);

parser.addArgument(
    ['-s', '--server'],
    {help: 'Lance le programme avec un serveur de debug.', defaultValue: false, action: "storeTrue"}
);

let arg = process.argv.slice(1);
if (process.argv.join(" ").indexOf("electron.exe") > -1) {
    arg = process.argv.slice(2);
}

try {
    args = parser.parseKnownArgs(arg);
    args = args[0];
} catch (e) {
    app.quit();
}

let mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 1450,
        height: 900,
    });

    let startURL = url.format({
        pathname: path.join(__dirname, '../dist/index.html'),
        protocol: 'file:',
        slashes: true
    });

    if (args.debug && args.server) {
        startURL = url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
            slashes: true
        });
    }

    mainWindow.loadURL(startURL);

    if (args.debug) {
        mainWindow.webContents.openDevTools({mode: "detach"});
    }

    global.cmdArgs = args;

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});