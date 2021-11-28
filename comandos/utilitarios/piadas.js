const { piadas } = require("../../arquivos/json/piadas.json")

module.exports = {
    name: "piadas",
    description: "alegre o seu dia",
    aliases: [ "piadas" ],
    cooldown: 1,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {
    
        message.reply(`:black_joker: | ${piadas[Math.round((piadas.length - 1) * Math.random())]}`);
    }
}