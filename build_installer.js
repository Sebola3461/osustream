const { MSICreator } = require('electron-wix-msi');
const path = require('path');
const APP_DIR = path.resolve(__dirname, './dist/win/osustream-win32-x64');
const OUT_DIR = "C:/Users/Sebola/Desktop"

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    appIconPath: "logo2.ico",
    description: 'Osu!Stream installer',
    exe: 'osustream',
    arch: "x64",
    name: 'Osu!Stream',
    manufacturer: 'Seboladev',
    version: '1.0.4',
    shortcutName: "Osu!Stream",
    ui: {
        chooseDirectory: true
    },
});

msiCreator.create().then(function(){
    msiCreator.compile();
});