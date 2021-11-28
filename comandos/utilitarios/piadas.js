const { piadas } = require("../../arquivos/json/piadas.json")

module.exports = {
    name: "piadas",
    description: "alegre o seu dia",
    aliases: [ "piadas" ],
    cooldown: 1,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {
    
        message.channel.send(`:black_joker: | ${piadas[Math.round((piadas.length - 1) * Math.random())]}`).then(() => {
            const permissions = message.channel.permissionsFor(message.client.user);

            if(permissions.has("MANAGE_MESSAGES")) // Permissão para gerenciar mensagens
                message.delete();
        });
    }
}