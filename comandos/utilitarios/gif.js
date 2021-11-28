const { gifs } = require("../../arquivos/json/gifs.json");

module.exports = {
    name: "rasputia",
    description: "Rasputia!",
    aliases: [ "gif" ],
    cooldown: 1,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message, args) {
            
        message.channel.send(gifs[Math.round((gifs.length - 1) * Math.random())]).then(() => {
            const permissions = message.channel.permissionsFor(message.client.user);

            if(permissions.has("MANAGE_MESSAGES")) // Permissão para gerenciar mensagens
                message.delete();
        });
    }
};