module.exports = function(value) {
    const { writeFileSync } = require("fs")
    const configs_file = `${process.env.APPDATA}/osustream/config.json`;

    writeFileSync(configs_file, JSON.stringify(value), "utf-8");

    return console.log("[Write Configs] Updated the configs file.")
};