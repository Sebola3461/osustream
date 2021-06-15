const { default: axios } = require("axios")
const { readFileSync } = require("original-fs")
const init = require("./init")

module.exports = function() {
    console.log("Checking for updates")
    let currentPackage = JSON.parse(readFileSync(__dirname+"/../package.json", "utf8"))
    axios.get("https://raw.githubusercontent.com/Sebola3461/osustream/main/updates.json").then((d) => {
        if (currentPackage.version != d.data.version) return init();
        console.log("Everything is up to date")
    }).catch(e => {
        console.log(e)
    })
}