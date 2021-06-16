const { default: axios } = require('axios');
const { app, BrowserWindow, Menu, Tray, Notification, dialog } = require('electron');
const { execSync } = require('child_process');
const { existsSync } = require('original-fs');
const generate_default = require('./Configs/generate_default');
const Configs = require('./Configs/index');
const { updateUserData } = require('./Twitch');
const { readFileSync } = require('fs');
let tray;
let trayQuit;
let mainWindow;

console.time("Config file check done in")
if (existsSync(`${process.env.APPDATA}/osustream/config.json`)) {
    void {};
} else {
    generate_default()
}
console.timeEnd("Config file check done in")

console.log("Running version " + JSON.parse(readFileSync(__dirname+"/package.json", "utf-8")).version)

if (Configs.getConfigs().twitch.pendingAuthentication == true) {
    console.log("[App] Created login window.")
    app.whenReady().then(() => {
        createLoginWindow()
        app.on('activate', function() {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })
} else {
    app.whenReady().then(() => {
        createWindow()
        app.on('activate', function() {
            if (BrowserWindow.getAllWindows().length === 0) createWindow()
        })
    })
}

function createWindow() {
    // Create the browser window.
    let trayNotification = new Notification('Osu!Stream', {
        body: 'osu!stream is in your taskbar tray'
    })

    console.time("Window creation done in".yellow)
    mainWindow = new BrowserWindow({
        icon: "./logo2.ico",
        width: 1270,
        height: 720,
        resizable: false,
        maximizable: false,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        webPreferences: {
            nodeIntegration: true,
            nodeIntegrationInSubFrames: true,
            nodeIntegrationInWorker: true,
            contextIsolation: false,
        }
    })
    console.timeEnd("Window creation done in".yellow)

    // and load the index.html of the app.
    console.time("Window load done in")
    const checkUpdates = require('./Updater/checkUpdates');
   
    checkUpdates()
    mainWindow.loadFile(__dirname + '/Static/index.html').then(console.timeEnd("Window load done in".yellow))
    console.log("[App] Created main window.")
        // mainWindow.webContents.openDevTools()

    mainWindow.on('close', function (event) {
        if (!trayQuit) {
            event.preventDefault();
            mainWindow.hide();
            event.returnValue = false;
            trayNotification.show()
        }
        trayNotification.show()
    });
}

function createLoginWindow() {
    // Create the browser window.
    const loginWindow = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        titleBarStyle: "hidden",
        webPreferences: {
            contextIsolation: true,
            allowRunningInsecureContent: true
        }
    })

    // and load the index.html of the app.
    loginWindow.loadURL('https://id.twitch.tv/oauth2/authorize?client_id=cuc2308lg1rxevlnabqa8fonyyiqm0&redirect_uri=https://www.twitch.tv/oauth/osustream/&response_type=token&scope=chat:read+chat:edit+user:edit+channel_editor')
    loginWindow.webContents.session.clearStorageData()
        // mainWindow.webContents.openDevTools()
    let redirects = 0;

    loginWindow.webContents.on('will-redirect', function(event, newUrl) {
        redirects++;

        if (redirects == 4) {
            let url = loginWindow.webContents.getURL()
            let token = url.replace("https://www.twitch.tv/oauth/osustream/#access_token=", "").slice(0, 30)

            axios.get('https://id.twitch.tv/oauth2/validate', {
                    headers: { Authorization: `OAuth ${token}` }
                })
                .then(function(response) {
                    login = response.data.login;
                    id = response.data.user_id;

                    let credentials = {
                        token: token,
                        login: login,
                        id: +id
                    };

                    Configs.changeConfig("twitch", "token", credentials.token)
                    Configs.changeConfig("twitch", "channel", credentials.login)
                    Configs.changeConfig("twitch", "id", credentials.id)
                    Configs.changeConfig("twitch", "pendingAuthentication", false)
                    updateUserData()
                    loginWindow.close()
                    createWindow()
                })
                .catch(e => {
                    console.log(e);
                });
        }
    })
}

app.on('window-all-closed', function() {
    if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', function () {
    if (!trayQuit) return;
});

app.on("ready", function() {
    tray = new Tray(__dirname+'/logo2.png');

    tray.setContextMenu(Menu.buildFromTemplate([
      {
        label: 'Show osu!stream', click: function () {
          mainWindow.show();
        }
      },
      {
        label: 'Disconnect and quit', click: function () {
          trayQuit = true;
          execSync("taskkill /f /im 9dh9ewhf9fhda98dhf-gosumemory.exe").catch(e => app.quit())
          app.quit();
        }
      }
    ]));
})

module.exports.createLoginWindow = createLoginWindow;
