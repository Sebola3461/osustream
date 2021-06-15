const { changeConfig } = require("../Configs")
const updateStream = require("../Twitch/Stream/updateStream")

module.exports = function() {    
    document.querySelectorAll(".command-panel-switch").forEach(element => {
        element.addEventListener("mouseover", event => {
            if (event.target.value == 'Disabled') { 
                event.target.value = 'Enable' 
            } 
            if (event.target.value == 'Enabled') { 
                event.target.value = 'Disable' 
            };
        })
        element.addEventListener("click", event => {
            if (event.target.value == 'Disable') { 
                event.target.value = 'Disabled' 
            }
            if (event.target.value == 'Enable') { 
                event.target.value = 'Enabled' 
            };
        })

        element.addEventListener("mouseleave", event => {
            if (event.target.value == 'Disable') { 
                event.target.value = 'Enabled' 
            }
            if (event.target.value == 'Enable') { 
                event.target.value = 'Disabled' 
            };
        })
    })

    document.getElementById("commands-pause-button").addEventListener("click", event => {
        if (event.target.getAttribute("value") == "Disabled") {
            changeConfig("bot", "disableCommands", "Disabled")
        }

        if (event.target.getAttribute("value") == "Enabled") {
            changeConfig("bot", "disableCommands", "Enabled")
        }
    })

    document.getElementById("disable-error-message-button").addEventListener("click", event => {
        if (event.target.getAttribute("value") == "Disabled") {
            changeConfig("bot", "chatErrorMessage", "Disabled")
        }

        if (event.target.getAttribute("value") == "Enabled") {
            changeConfig("bot", "chatErrorMessage", "Enabled")
        }
    })

    document.getElementById("disable-login-confirmation-button").addEventListener("click", event => {
        if (event.target.getAttribute("value") == "Disabled") {
            changeConfig("bot", "chatJoinConfirmation", "Disabled")
        }

        if (event.target.getAttribute("value") == "Enabled") {
            changeConfig("bot", "chatJoinConfirmation", "Enabled")
        }
    })

    document.getElementById("command-cooldown-switch").addEventListener("input", event => {
        changeConfig("bot", "cooldown", event.target.value)
    })

    document.getElementById("stream-save").addEventListener("click", event => {
        updateStream(document.getElementById("stream-title").value, document.getElementById("stream-category").value)
    })
}