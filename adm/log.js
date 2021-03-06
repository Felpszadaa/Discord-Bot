const { MessageEmbed } = require('discord.js');

module.exports = async ({client, message, content}) => {
    
    const d = new Date();
    const day = d.toLocaleString('en-US', { weekday: 'long' });

    let min = (`0${d.getMinutes()}`).substr(-2); // Preservar o digito 0
    let hr = (`0${d.getHours()}`).substr(-2); // Preservar o digito 0

    let ampm = "am";
    if(hr > 12){
        hr -= 12;
        ampm = "pm";
    }

    const comando_inserido = content.replaceAll("`", "'");

    const date = d.getDate();
    const month = d.toLocaleString('en-US', { month: 'long' });
    const year = d.getFullYear();

    const embed = new MessageEmbed()
    .setTitle("> New interaction")
    .setColor(0x29BB8E)
    .setDescription(`:man_raising_hand: (ID) User: \`${message.author.id}\`\n:label: Username: \`${message.author.username}\`\n\n:link: (ID) Server: \`${message.guild.id}\`\n:label: Server name: \`${message.guild.name}\`\n:link: (ID) Channel: \`${message.channel.id}\`\n:label: Channel name: \`${message.channel.name}\`\n:link: (ID) Message: \`${message.id}\`\n\n:pencil: Command: \`${comando_inserido}\`\n:alarm_clock: Time/date: \`${hr}:${min}${ampm} | ${day} - ${date} ${month} ${year}\``);

    client.channels.cache.get("912719186663473203").send({ embeds: [embed] }); // Envia o log com os comandos do usuário
}