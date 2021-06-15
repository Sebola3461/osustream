module.exports = function() {
    const { readFileSync } = require("fs")
    const configs_file = `${process.env.APPDATA}/osustream/config.json`

    console.log(`[Get Configs] Returning configs`)
    let configs = JSON.parse(readFileSync(configs_file, "utf8").replace("﻿", ""﻿﻿﻿));
    return configs;
}