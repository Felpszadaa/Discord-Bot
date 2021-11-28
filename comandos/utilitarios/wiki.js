const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "wiki",
    description: "Pesquisa sobre algo na wiki",
    aliases: [ "w", "buscar", "busca", "search", "wikipedia" ],
    usage: "w Slondo",
    cooldown: 3,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message, args) {

        let counter = 0;
        let content = args.join(" ").toLowerCase();

        if(args.length > 0){
            const url = `https://api.duckduckgo.com/?q=${encodeURI(content)}&format=json&pretty=0&skip_disambig=1&no_html=1`;

            const termo_pesquisado_cc = content.slice(1);
            const username = message.author.username;
            
            fetch(url, {headers:{"accept-language": "pt-br"}})
            .then(response => response.json())
            .then(async res => {
            
            const fields = [];
            
            if(res.RelatedTopics.length > 0)
                fields.push({ name: `:books: Tópicos relacionados`, value: "\u200B" });

            for(const topic of res.RelatedTopics){
                counter++;

                let text = `${topic.Text.substring(0, 100)}...`;

                fields.push({
                    name: text,
                    value: topic.FirstURL,
                    inline: true
                });

                if(counter > 5)
                    break;
            }

            if(res.Heading !== ""){
                fields.length = fields.length > 5 ? 5 : fields.length

                const Embed = new MessageEmbed()
                .setColor(0x29BB8E)
                .setTitle(res.Heading)
                .setAuthor(res.AbstractSource)
                .setDescription(res.AbstractText)
                .setThumbnail(res.Image !== '' ? `https://api.duckduckgo.com${res.Image}` : 'https://cdn.iconscout.com/icon/free/png-256/duckduckgo-3-569238.png')
                .addFields(fields)
                .setTimestamp()
                .setFooter('DuckDuckGo API', message.author.avatarURL({dynamic:true}))
                .setURL(res.AbstractURL);

                message.reply({ embeds: [Embed] });
            }else
                if(username.includes(termo_pesquisado_cc))
                    message.reply(`:no_entry_sign: | Pq vc está se pesquisando? Não tem nada sobre vc aq :v`);
                else
                    message.reply(`:no_entry_sign: | Não encontrei nada relacionado a sua pesquisa [ \`${content}\` ], tente novamente`);
            })
            .catch(() => {
                message.reply(`:no_entry_sign: | Não encontrei nada relacionado a sua pesquisa [ \`${content}\` ], tente novamente`);
            });
        }
    }
};