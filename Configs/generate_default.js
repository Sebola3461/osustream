const { stringify } = require("ini")
const { writeFileSync, readFileSync } = require("original-fs")

module.exports = function() {
    let str = readFileSync(__dirname+"/default.json", "utf-8")
    writeFileSync(`${process.env.APPDATA}/osustream/config.json`, str, "utf8")
    console.log("generated the default config file")
}