const Configs = require("../Configs")

module.exports = function() {
    let configs = Configs.getConfigs()
    document.getElementById("commands-pause-button").setAttribute("value", configs.bot.disableCommands)
    document.getElementById("disable-error-message-button").setAttribute("value", configs.bot.chatErrorMessage)
    document.getElementById("disable-login-confirmation-button").setAttribute("value", configs.bot.chatJoinConfirmation)
    document.getElementById("command-cooldown-switch").setAttribute("value", configs.bot.cooldown)
}