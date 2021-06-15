const { writeFileSync } = require('fs');
const logger = require('../Pages/logger');
const setStatus = require('../Pages/setStatus');

module.exports = function() {
    logger("App", "Waiting for start the game integration")
    const { exec } = require('child_process');
    let memory = exec(`${__dirname + "\\"}memory.exe`)
    setStatus("osu-connection-diplayer", "1", "Connected")
    logger("Sucess", "Initialized the game integration")
    
    memory.on("exit", process => {
        setStatus("osu-connection-diplayer", "0", "Disconnected")
        logger("Error", `We lost the game integration process\n(Exit code: ${memory.exitCode})`)
    })
    window.onclose = () => { return memory.kill('SIGINT'); }
}