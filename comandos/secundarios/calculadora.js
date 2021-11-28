const { isInteger } = require('mathjs');
const math = require('mathjs');

module.exports = {
    name: "calculadora",
    description: "calcula alguma operação matemática",
    aliases: [ "cal" ],
    cooldown: 1,
    permissions: [ "SEND_MESSAGES" ],
    execute(client, message, args){

        if(args.length < 1) return message.reply("Informe alguma operação");

        let operacao = args.join(" ");
        
        if(args[0].toString() === "+" || args[0].toString() === "-" || args[0].toString() === "*" || args[0].toString() === "/"){
            let operador = args[0].toString();
            args.shift();
            operacao = args.join(` ${operador} `);
        }

        try{
            let resultado = math.evaluate(operacao);
            let emoji_res = ":chart_with_upwards_trend:";

            if(resultado < 0)
                emoji_res = ":chart_with_downwards_trend:";
            
            if(!isInteger(resultado))
                resultado = resultado.toFixed(6)

            message.reply(`${emoji_res} | Resultado: \`${resultado.toLocaleString('pt-BR')}\``);
        }catch(err){
            message.reply(`:octagonal_sign: | Ocorreu um erro com a operação: \`${operacao}\``);
        }
    }
}