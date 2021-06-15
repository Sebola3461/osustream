const logger = require("../Pages/logger");

module.exports = function(category, config, value) {
    delete require.cache[require.resolve(`./get_configs.js`)];
    const configs = require("./index")
    let current_configs = configs.getConfigs();
    const selected_category = current_configs[category];

    selected_category[config] = value;
    configs.writeConfigs(current_configs)
    
    console.log(`[Edit Configs] Edited config ${config}`)
    if (config != "cooldown") logger("Sucess", "Configuration updated!");
    return current_configs;
}