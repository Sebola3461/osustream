const { default: axios } = require("axios")
const { readFileSync } = require("original-fs")
const { getConfigs } = require("../Configs")
const init = require("./init");
const updateConfigFile = require("./updateConfigFile");
const configs = getConfigs();

module.exports = function() {
    console.log("Checking for updates")
    let currentPackage = JSON.parse(readFileSync(__dirname+"/../package.json", "utf8"))
    axios.get("https://raw.githubusercontent.com/Sebola3461/osustream/main/updates.json").then((d) => {
        if (currentPackage.version != d.data.version ) {
            return init();
        }
        console.log("Everything is up to date")
    }).catch(e => {
        console.log(e)
    })

    axios.get("https://raw.githubusercontent.com/Sebola3461/osustream/main/Configs/default.json").then((d) => {
        console.log(d.data)
        if (configs.version != d.data.version ) {
            return updateConfigFile();
        }
        console.log("Config file is up to date")
    }).catch(e => {
        console.log(e)
    })
}