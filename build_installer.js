const { MSICreator } = require('electron-wix-msi');
const path = require('path');
const APP_DIR = path.resolve(__dirname, './dist/win/osustream-win32-x64');
const OUT_DIR = path.resolve(__dirname, './windows_installer');

const msiCreator = new MSICreator({
    appDirectory: APP_DIR,
    outputDirectory: OUT_DIR,
    description: 'Osu!Stream installer',
    exe: 'osustream',
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