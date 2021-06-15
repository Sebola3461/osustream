const { default: axios } = require("axios")
const { writeFileSync } = require("original-fs")

module.exports = async function() { 
    axios.get("https://raw.githubusercontent.com/Sebola3461/osustream/main/Configs/default.json").then((d) => {
        writeFileSync(`${process.env.APPDATA}/osustream/config.json`, JSON.stringify(d.data), "utf8")
        console.log("Config file is up to date")
    }).catch(e => {
        console.log(e)
    })
}