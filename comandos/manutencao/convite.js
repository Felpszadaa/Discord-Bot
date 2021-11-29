const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "convite",
    description: "Convide a ceira para um servidor",
    aliases: [ "inv" , "invite" ],
    cooldown: 2,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {

        const embed = new MessageEmbed()
        .setColor(0x29BB8E)
        .setTitle("Convide-me!")
        .setURL('https://discord.com/oauth2/authorize?client_id=912684445163745320&scope=bot&permissions=534760652481')
        .setThumbnail('https://images2.imgbox.com/85/fb/yfSLS2Uz_o.jpg')
        .setDescription('Convide-me clicando aqui!')
        .setTimestamp()
        .setFooter("Ceira");
        
        const m = await message.channel.send(`${message.author} enviei o convite no seu privado`);
        m.react('📫');
        
        client.users.cache.get(message.author.id).send({ embeds: [embed] });
    }
};