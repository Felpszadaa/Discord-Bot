module.exports = {
    name: "ram",
    description: "mostra ram",
    aliases: [ "gasto", "ram", "memoria" ],
    cooldown: 2,
    permissions: [ "SEND_MESSAGES" ],
    async execute(client, message, args){
        
        let gifs = ["https://tenor.com/view/pesado-gimnasio-levantar-pesas-entrenamiento-debil-gif-10860529", "https://tenor.com/view/chrome-eating-ram-joey-friends-ram-abuse-greedy-chrome-gif-17554657", "https://tenor.com/view/yawnface-gif-4425271"];
        
        let gif = Math.round((gifs.length - 1) * Math.random());
        let ram = process.memoryUsage().heapUsed / 1024 / 1024

        message.channel.send("Está com " + ram.toFixed(2)+ " % de ram em uso ");
        message.channel.send(gifs[gif]);
    } 
}