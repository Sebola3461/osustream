const { default: axios } = require("axios")
const returnStrings = require("./commandsManager/returnStrings")

exports.run = (client, message, args, cmd, channel) => {
    axios("http://127.0.0.1:7272/json").then(gameData => {
        gameData = gameData.data;
        gameData = JSON.parse(JSON.stringify(gameData, "utf8"))
        try {
            const commands_strings = returnStrings();
            // Now playing: {now_playing_artist} - {now_playing_title} [{now_playing_diff}] by {now_playing_mapper}\nDownload: {now_playing_url}
            let reply = commands_strings.np.replace("{now_playing_artist}", gameData.menu.bm.metadata.artist)
                .replace("{now_playing_title}", gameData.menu.bm.metadata.title)
                .replace("{now_playing_diff}", gameData.menu.bm.metadata.difficulty)
                .replace("{now_playing_mapper}", gameData.menu.bm.metadata.mapper)
                .replace("{now_playing_url}", `https://osu.ppy.sh/beatmapsets/${gameData.menu.bm.set}`)
            client.say(channel, reply)
        } catch (e) {
            console.log(e)
        }
    })
}