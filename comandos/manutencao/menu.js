const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "menu",
    description: "Altere o avatar do bot",
    aliases: [ "help" ],
    cooldown: 1,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args) {
        const embed = new MessageEmbed()
        .setTitle("Boas Vindas Ao Bot Mais Enceirado Do Discord!")
        .setColor('RANDOM')
        .setDescription("Comandos:\n\n:black_joker: `cpiadas` - Envia uma piada aleatória\n:postal_horn: `cgif` - Envia um gif aleatório\n:cloud: `cw` - Pesquisa qualquer coisa na Wikipédia\n:abacus: `ccal` - Calcula qualquer operação matemática simples\n:envelope: `cinv` - Envia o link de convite do bot na sua dm\n:lock: `clock` - Para bloquear o canal\n:newspaper2: `ccl` - Apaga as mensagens\n:no_entry_sign: `ckick` - Comando para banir o usuário\n ")

        message.reply({embeds: [embed]})
    }
}