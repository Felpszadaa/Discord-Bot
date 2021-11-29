const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "botavatar",
    description: "Altere o avatar do bot",
    aliases: [ "cha" ],
    cooldown: 2,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {
    
        if(message.author.id !== "678061682991562763") return; // Apenas o dono do bot pode alterar o avatar
        
        let novo_perfil;
        
        if(message.attachments.size > 0)
            novo_perfil = message.attachments.first().url;
        else {
            novo_perfil = args[0];
            novo_perfil = novo_perfil.replace("<", "");
            novo_perfil = novo_perfil.replace(">", "");
        }

        if(!novo_perfil.includes(".png") && !novo_perfil.includes(".jpg") && !novo_perfil.includes(".jpeg") && !novo_perfil.includes(".bmp")) // Formato da imagem
            return message.reply(":octagonal_sign: | Envie um link/arquivo diferente de gif");

        await client.user.setAvatar(novo_perfil); // Altera o avatar do bot
        message.reply(":bust_in_silhouette: | Avatar enceirado atualizado");

        const att_avatar = new MessageEmbed() // Informa a alteração do avatar
        .setTitle(":bust_in_silhouette: O Avatar do Bot foi alterado")
        .setColor(0x29BB8E)
        .setImage(novo_perfil)
        .setDescription(`**Alterado por** ( \`${message.author.username}\` | \`${message.author.id}\` )`);

        message.reply({embeds: [att_avatar]}); // Informa a alteração do avatar
    }
}