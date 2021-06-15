const { readFileSync } = require("original-fs")

module.exports = async function() {
    let updateMeta; //= JSON.parse(readFileSync("./../updates.json", "utf-8"))
    let fetchData = fetch("https://raw.githubusercontent.com/Sebola3461/osustream/main/updates.json")
    fetchData.then(res =>
        res.json()).then(d => {
            console.log(d)
            updateMeta = JSON.parse(d,"utf8");
            console.log(updateMeta)
        }).catch(e => {
        console.log(e)
    })
}   