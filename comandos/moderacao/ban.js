module.exports = {
  name: "ban",
  description: "expulsa ou bane algum usuário do servidor",
  aliases: ["kick"],
  cooldown: 2,
  permissions: ["SEND_MESSAGES"],
  async execute(client, message, args) {
    const permissions_user = await message.guild.members.fetch(message.author);
    const permissions_bot = await message.guild.members.fetch(
      message.client.user.id
    );

    if (
      !permissions_user.permissions.has("KICK_MEMBERS") ||
      !permissions_user.permissions.has("BAN_MEMBERS")
    )
      return message
        .reply(`:octagonal_sign: | Você não pode banir ou expulsar membros`)
        .then((msg) => setTimeout(() => msg.delete(), 5000));

    if (
      !permissions_bot.permissions.has("KICK_MEMBERS") ||
      !permissions_bot.permissions.has("BAN_MEMBERS")
    )
      return message
        .reply(`:octagonal_sign: | Eu não posso banir ou expulsar membros`)
        .then((msg) => setTimeout(() => msg.delete(), 5000));

    const emoji_ban = "";
    let alvo = message.guild.members.resolve(message.mentions.members.first());

    if (!alvo) {
      if (isNaN(args[0])) return message.reply("Informe o ID de um usuário");

      alvo = await message.guild.members.fetch(args[0]); // Pega o usuário pelo ID
    }

    if (
      alvo.permissions.has("BAN_MEMBERS") ||
      alvo.permissions.has("KICK_MEMBERS")
    )
      return message.reply(
        "Parado ai seu salafrário! Este membro é um Administrador também"
      );

    if (!alvo)
      return message
        .reply(`:hotsprings: | "Usuário inválido!`)
        .then((msg) => setTimeout(() => msg.delete(), 3000));

    let banReason = args.join(" ").slice(22);
    let dias = banReason.split(" ")[0]; // Dias que ficará banido

    if (!isNaN(dias)) banReason = banReason.replace(dias, "");
    else dias = null;

    if (!banReason) banReason = "";

    // Banindo ou expulsando
    if (message.content.includes("ban"))
      alvo
        .ban({ days: dias, reason: banReason })
        .then(() => {
          message.reply(`${emoji_ban} | ${alvo} tomou uma esfihada`);
        })
        .catch(() => {
          return message.reply(`:sos: | erro ao banir`);
        });
    else
      alvo
        .kick({ reason: banReason })
        .then(() => {
          message.reply(`${alvo} foi banido`);
        })
        .catch(() => {
          return message.reply(`:sos: | Não foi possível expulsar o usuário`);
        });
  },
};
