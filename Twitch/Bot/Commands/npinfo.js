const { default: axios } = require("axios")
const returnStrings = require("./commandsManager/returnStrings")

exports.run = (client, message, args, cmd, channel) => {
    axios("http://127.0.0.1:7272/json").then(gameData => {
        gameData = gameData.data;
        gameData = JSON.parse(JSON.stringify(gameData, "utf8"))
        try {
            const commands_strings = returnStrings();
            console.log(gameData)
                // {now_playing_artist} - {now_playing_title} [{now_playing_diff}] by {now_playing_mapper} | BPM: {now_playing_bpm}, CS: {now_playing_cs}, AR: {now_playing_ar}, OD: {now_playing_od}, HP: {now_playing_hp} | ({now_playing_sr} ★) 100% {pp_100}pp ▶ 99% {pp_99}pp ▶ 95% {pp_95}pp
            let reply = commands_strings.npInfo.replace("{now_playing_artist}", gameData.menu.bm.metadata.artist)
                .replace("{now_playing_title}", gameData.menu.bm.metadata.title)
                .replace("{now_playing_diff}", gameData.menu.bm.metadata.difficulty)
                .replace("{now_playing_mapper}", gameData.menu.bm.metadata.mapper)
                .replace("{now_playing_bpm}", gameData.menu.bm.stats.BPM.max)
                .replace("{now_playing_cs}", gameData.menu.bm.stats.CS)
                .replace("{now_playing_ar}", gameData.menu.bm.stats.AR)
                .replace("{now_playing_od}", gameData.menu.bm.stats.OD)
                .replace("{now_playing_hp}", gameData.menu.bm.stats.HP)
                .replace("{now_playing_sr}", gameData.menu.bm.stats.fullSR)
                .replace("{now_playing_mods}", gameData.menu.mods.str)
                .replace("{pp_100}", gameData.menu.pp["100"])
                .replace("{pp_99}", gameData.menu.pp["99"])
                .replace("{pp_98}", gameData.menu.pp["98"])
                .replace("{pp_96}", gameData.menu.pp["96"])
                .replace("{pp_95}", gameData.menu.pp["95"])
                .replace("{pp_94}", gameData.menu.pp["95"])
            client.say(channel, reply)
        } catch (e) {
            console.log(e)
        }
    })
}