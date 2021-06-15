const { changeConfig } = require("../Configs")

module.exports = function() {
    document.getElementById("commands-save").addEventListener("click", () => {
        changeConfig("strings", "nowplaying", document.getElementById("npinput").value)
        changeConfig("strings", "skin", document.getElementById("skininput").value)
        changeConfig("strings", "stats", document.getElementById("statsinput").value)
        window.alert("Saved!")
    })
}