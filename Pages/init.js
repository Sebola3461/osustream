const start = require("../Gosumemory/start");
const bot = require("../Twitch/Bot/bot");
const updateUserInfo = require("../Twitch/PageComponents/updateUserInfo");
const getStreamData = require("../Twitch/Stream/getStreamData");
const updateStream = require("../Twitch/Stream/updateStream");
const buttons = require("./../Pages/buttons");
const sync = require("./../Pages/sync");
const logger = require("./../Pages/logger");
const setStatus = require("./../Pages/setStatus");

updateUserInfo()
bot()
start()
sync()
buttons()