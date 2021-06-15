const Configs = require("../../Configs")
let configs = Configs.getConfigs()

module.exports = function() {
  let stream = fetch(`https://api.twitch.tv/kraken/channels/${configs.twitch.id}`, {
    method: "get",
      headers: {
        'Content-Type': 'application/json',
        "Client-ID": "cuc2308lg1rxevlnabqa8fonyyiqm0",
        Accept: "application/vnd.twitchtv.v5+json",
      },
    })
    stream.catch(e => {
    console.error(e)
  })

  return stream;
}