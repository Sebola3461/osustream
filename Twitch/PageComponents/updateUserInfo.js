const { getConfigs } = require("../../Configs");
const getStreamData = require("../Stream/getStreamData");

module.exports = async function() {
    const configs = getConfigs();
    document.getElementById("sidebar-channel-name").innerText = configs.twitch.channel;
    document.getElementById("sidebar-channel-name").setAttribute("href", `https://twitch.tv/${configs.twitch.channel}`)
    document.getElementById("sidebar-pfp").setAttribute("src", configs.twitch.avatar)
    document.getElementById("sidebar-channel-name").setAttribute("href", configs.twitch.channel)

    getStreamData().then(res => res.json()).then(streamData => {
    document.getElementById("stream-title").value = streamData.status;
    document.getElementById("stream-category").value = streamData.game;
    })
}