const logger = require('../../Pages/logger');
const setStatus = require('../../Pages/setStatus');

module.exports = function() {
    let Configs = require('../../Configs').getConfigs();
    let cooldown = false;
    let cooldownTime = new Number(Configs.bot.cooldown).valueOf();
    cooldownTime = cooldownTime*100;
    const { Client } = require('tmi.js');
    const channel = Configs.twitch.channel

    logger("App", "Initializing command listener")
    const client = new Client({
        options: {
            debug: false
        },
        connection: {
            secure: true,
            reconnect: true
        },
        identity: {
            username: channel,
            password: "oauth:" + Configs.twitch.token
        },
        channels: [channel]
    });

    client.connect().catch(e => {
        logger("Error", `A connection error has ocurred (Reason: ${e.message})`)
    })

    client.on('connected', function() {
        logger("Sucess", `Connected to chat`)
        setStatus("chat-connection-diplayer", "1", "Connected")
if (Configs.bot.chatJoinConfirmation == "Disabled") return;
        client.say(channel, "Osu!Stream iniciado! Você pode usar os comandos !np, !npinfo e !skin");
    });

    client.on('message', async function(channel, user, message, self) {
        Configs = require('../../Configs').getConfigs();
        if (self) return;
        if (user['message-type'] === "whisper") return;
        if (!message.startsWith("!")) return;
        if (Configs.bot.disableCommands == "Enabled") return;
        if (cooldown == true) return;

        let cmd = message.split(" ")[0];
        cmd = cmd.slice(1);
        let args = message.split(" ").slice(1);
        try {
            let commandFile = require(`./Commands/${cmd}.js`);
            commandFile.run(client, message, args, cmd, channel)
            cooldown = true
            setTimeout(function() { cooldown = false }, cooldownTime);
        } catch (err) {
            if (err.code == "MODULE_NOT_FOUND") return;
            client.say(channel, "Um erro ocorreu ao tentar executar este comando, desculpe");
        }
    })
}