const { default: axios } = require("axios")
const { readFileSync, writeFileSync } = require("original-fs")
const { getConfigs, editConfigs } = require("../Configs")
configs = getConfigs();

module.exports = async function() {
    if (configs.general.pendingUpdate == false) return;
    console.log("Pending update detected, updating files")
    let currentPackageJson = JSON.parse(readFileSync(__dirname+"/../package.json", "utf-8"))
    axios.get("https://raw.githubusercontent.com/Sebola3461/osustream/main/updates.json").then((d) => {
        d = d.data;
            for(let index = 0; index < d["win32-x64"].github_raw.length; index++) {
                axios.get(`https://raw.githubusercontent.com/Sebola3461/osustream/main/${d["win32-x64"].github_raw[index]}`).then((fileD) => {
                    fileD = fileD.data;
                    writeFileSync(`${d["win32-x64"].files[index]}`, `${fileD}`, "utf8")
                    currentPackageJson.version = d["win32-x64"].version;
                    writeFileSync(__dirname+"/../package.json", JSON.stringify(currentPackageJson), "utf8")
                    editConfigs("general", "pendingUpdate", false)
                })
            }
        }).catch(e => {
        console.log(e)
        editConfigs("general", "pendingUpdate", true)
    })
}   