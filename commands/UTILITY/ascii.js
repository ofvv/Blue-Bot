const figlet = require('figlet');
const discord = require('discord.js');

module.exports = {
    name: "ascii",
      description: "Text to Ascii",
      category: "UTILITY",
      usage: "ascii <text>",
      run: async (client, message, args, prefix, config) => {

        const uff = args[0]
        const maxlen = 100;
    
        if (!uff) {
            let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ Please give a text`)
            return message.channel.send(embed);
        }

        if (uff.lenght > 16) {
          let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ Please give text at last 16 symbols`)
            return message.channel.send(embed);
        }

        figlet(`${uff}`, function(err, data) {
          message.channel.send(`${data}`, { code: "" }).catch(e => {

            if(e.length > 2000) return;
      
            let embed = new discord.MessageEmbed()
            .setColor(config.error)
            .setDescription(`❌ ${e}`);
      
            message.channel.send(embed);
        })
        });

    }
}