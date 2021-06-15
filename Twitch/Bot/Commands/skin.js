const { default: axios } = require("axios")
const returnStrings = require("./commandsManager/returnStrings")

exports.run = (client, message, args, cmd, channel) => {
    axios("http://127.0.0.1:7272/json").then(gameData => {
        gameData = gameData.data;
        gameData = JSON.parse(JSON.stringify(gameData, "utf8"))
        try {
            const commands_strings = returnStrings();
            let reply = commands_strings.skiname.replace("{skin_name}", gameData.settings.folders.skin)
            client.say(channel, reply)
        } catch (e) {
            console.log(e)
        }
    })
}