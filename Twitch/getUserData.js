const { getConfigs, editConfigs } = require('../Configs');
const { default: axios } = require('axios');

module.exports = function() {
    axios.get(`https://api.twitch.tv/kraken/users/${getConfigs().twitch.id}`, {
            headers: {
                "Accept": "application/vnd.twitchtv.v5+json",
                "Client-ID": "cuc2308lg1rxevlnabqa8fonyyiqm0"
            }
        })
        .then(function(response) {
            console.log("[Get User Data] Retrived user data.")
            let data = {
                avatar: response.data.logo,
                _id: response.data._id
            }
            editConfigs("twitch", "avatar", data.avatar)
            console.log("[Get User Data] Updated the credentials file.")
        }).catch(e => {
            console.error(e)
        })
}