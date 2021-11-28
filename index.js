const { readdirSync } = require("fs");
const handler = require("wax-command-handler");
const { Client, Intents, MessageEmbed } = require("discord.js");
const { token, token_2, prefix } = require("./config.json");
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  ],
});

String.prototype.replaceAll = String.prototype.replaceAll || function(needle, replacement) {
  return this.split(needle).join(replacement);
};

const commandConfig = new handler.CommandConfig(
  client,
  prefix,
  true,
  `${__dirname}/arquivos/data/prefixes`
);

handler.setup(commandConfig);

client.on("ready", async () => {
  await require("./adm/status.js")({client});
  
  for (const folder of readdirSync(`${__dirname}/comandos/`)){
    for (const file of readdirSync(`${__dirname}/comandos/${folder}`).filter(file => file.endsWith('.js'))) {
        const command = require(`./comandos/${folder}/${file}`);
        handler.addCommand(command);
    }
  }
  
  console.log("Ceira está ON!")
});

client.on("messageCreate", async (message) => {
  if (message.author.bot || message.webhookId) return
  if (message.content.includes(client.user.id) ) return message.reply("Digite `chelp` para ver a lista de comandos");
  
  if (!message.content.startsWith(prefix)) return
  
  let content = message.content
  content = content.replace(prefix, "")
  
  handler.messageReceived(message)
})

handler.events.on("command_executed", async (command, discord_client, message, args) => {
    if (message.author.bot || message.webhookId) return;
    
    if (message.channel.type === "GUILD_TEXT") {
        const permissions = message.channel.permissionsFor(message.client.user);

        if (!permissions.has("SEND_MESSAGES")) return; // Permissão para enviar mensagens no canal
    }

    await handler.executeCommand(command, discord_client, message, args);
    const content = message.content;
    await require('./adm/log.js')({client, message, content});
})

handler.events.on("command_error", async e => {
    console.log(e);

    const embed = new MessageEmbed({
        title: "CeiraException",
        description: `\`\`\`${e.toString().substring(0, 2000)}\`\`\``,
        color: "RED"
    })

    client.channels.cache.get('913245286573416518').send({ embeds: [embed] })
})

client.login(token);
// client.login(token_2);