/*
* This uses ECMA 6
*
* */
// Module to control application life.
const electron = require('electron');
// System tray module
const {Menu, Tray} = require('electron');

//static variable to allow global read-only applicaiton state reference
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.

/*
* Code added to build the context tray
* */

let tray = null;
let windowState = 0;
let mainWindow;
//added to prevent multiple windows from being opened
function openNewWindow(){
    if(windowState === 0){
        createWindow();
        windowState = 1;
    }
}

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 400, height: 600});
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', function(){
    //load icon file that'll be displayed in system tray
    tray = new Tray('graphics/my_graphic.png');
    const contextMenu = Menu.buildFromTemplate([
        {label: 'Item1', type: 'radio'},
        {label: 'Item2', type: 'radio'},
        {label: 'Item3', type: 'radio', checked: true},
        {label: 'Item4', type: 'radio'},
        {type: 'separator'},
        //create a clickable button with an icon. I think it looks cool
        //Note- the functional argument is the only way to do this
        //It wasn't specified in the documentation, but was observed from looking
        //at source function signatures
        {icon: 'graphics/my_graphic.png', label: 'Button', click(){openNewWindow();}}
    ]);
    tray.setToolTip('Hover Text');
    //add the context menu to the Tray object
    tray.setContextMenu(contextMenu);
    //allow for general clicking on the icon to also open the window
    //Note: Context menus are only assigned to the right-click. This is done automatically
    tray.on('click', function(e){
        openNewWindow();
    });
});

/*
==============================================================================
MAC OS X HANDLING
==============================================================================
 */


// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q

    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.