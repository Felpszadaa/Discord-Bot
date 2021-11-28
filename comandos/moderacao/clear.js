module.exports = {
  name: "clear",
  description: "apaga mensagens de chat",
  aliases: ["cl", "limpar", "apagar"],
  cooldown: 2,
  permissions: ["SEND_MESSAGES"],
  async execute(client, message, args) {
    const permissions_user = message.channel.permissionsFor(message.author);
    const permissions_bot = message.channel.permissionsFor(message.client.user);

    if (!permissions_user.has("MANAGE_MESSAGES"))
      return message
        .reply(
          `:octagonal_sign: | Você não possui a permissão \`Gerenciar mensagens\``
        )
        .then((msg) => setTimeout(() => msg.delete(), 5000));

    if (!permissions_bot.has("MANAGE_MESSAGES"))
      // Permissão para gerenciar mensagens
      return message
        .reply(
          `:octagonal_sign: | Eu não tenho permissão a permissão \`Gerenciar mensagens\``
        )
        .then((msg) => setTimeout(() => msg.delete(), 5000));

    if (args.length !== 1 || isNaN(args[0]))
      // Caracteres de texto ou sem entradas suficientes
      return message.reply(
        "Informe o número de mensagens q deseja remover\nPor exemplo, `.ccl 20`"
      );

    if (args[0] < 1 || args[0] > 100)
      // Valor maior que 100 ou menor que 1
      return message.reply(
        ":warning: | Informe um número entre `0` e `100` para remover"
      );

    let texto = "mensagens` foram removidas";

    if (args[0].value === 1) texto = 'mensagem` foi removida"';

    message.channel
      .bulkDelete(parseInt(args[0]))
      .then(() => {
        message.channel
          .send(`:hotsprings: | ${message.author}, \`${args[0]} ${texto}`)
          .then((msg) => setTimeout(() => msg.delete(), 5000));
      })
      .catch((err) => {
        message
          .reply(
            `:octagonal_sign: | Não foi possível executar este comando, pois há mensagens fixadas ou mensagens muito antigas, diminua a quantidade e tente novamente`
          )
          .then((msg) => setTimeout(() => msg.delete(), 5000));
      });

    message.delete(); // apaga a mensagem do comando
  },
};
