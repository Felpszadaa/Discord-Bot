const { Permissions } = require('discord.js');
const prefix = require('../../config.json');

module.exports = {
    name: "Travar",
    description: "Trava ou destrava um canal do servidor",
    aliases: [ "lock", "lok", "lk", "unlk", "unlock" ],
    cooldown: 2,    
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {

        const permissions_user = message.channel.permissionsFor(message.author);
        const permissions_bot = await message.guild.members.fetch(message.client.user.id);

        if(!permissions_user.has("MANAGE_CHANNELS"))
            return message.reply(`:octagonal_sign: | Você não possuí permissões para gerenciar este canal`).then(msg => setTimeout(() => msg.delete(), 5000));

        if(!permissions_bot.permissions.has("MANAGE_CHANNELS") || !permissions_bot.permissions.has("MANAGE_ROLES"))
            return message.reply(`:octagonal_sign: | Eu não posso bloquear este canal, eu preciso das permissões \`Gerenciar Canais\` & \`Gerenciar cargos\` para isto`).then(msg => setTimeout(() => msg.delete(), 5000));

        let msg_retorno = `:lock: | Canal **${message.channel.name}** bloqueado\nUtilize \`cunlk\` para desbloquear`;
        
        if (message.content === `cunlk` || message.content === `cunlock` || message.content === `cdestravar` || message.content === `cliberar`) {
            msg_retorno = `:unlock: | Canal **${message.channel.name}** desbloqueado\nUtilize \`clock\` para bloquear`;
            
            message.channel.permissionOverwrites.set([
                {
                    id: message.guild.id,
                    allow: [Permissions.FLAGS.SEND_MESSAGES]
                }
            ])
            .then(() => message.reply(msg_retorno));
        }else{
            message.channel.permissionOverwrites.set([
                {
                    id: message.guild.id,
                    deny: [Permissions.FLAGS.SEND_MESSAGES]
                },
                {
                    id: client.user.id,
                    allow: [Permissions.FLAGS.SEND_MESSAGES]
                }
            ])
            .then(() => {
                message.reply(msg_retorno)
            });
        }
    }
}