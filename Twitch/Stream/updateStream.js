const Configs = require("../../Configs")
const logger = require("../../Pages/logger")
let configs = Configs.getConfigs()

module.exports = function(title, category) {
  const data = {
    channel: {
      status: title,
      game:category
    }
  }
  let stream = fetch(`https://api.twitch.tv/kraken/channels/${configs.twitch.id}`, {
    method: "put",
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/vnd.twitchtv.v5+json",
        Authorization: `OAuth ${configs.twitch.token}`,
      },
      body: JSON.stringify(data)
    })
    stream.then(res =>
      res.json()).then(d => {
          logger("Sucess", "Stream has updated!")
      }).catch(e => {
        logger("Error", error.message)
        console.log(e)
  })
}