const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const config = require('../../config.json');

module.exports = {
  name: "help",
  description: "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  aliases: ["commands"],
  category: "INFO",
  run: async (client, message, args) => {

    let prefix = db.get(`bluebot_prefix_${message.guild.id}`);
    if(prefix === null) prefix = config.default_prefix;

    if (args[0]) {
      const command = await client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .setColor(config.color)
        .setFooter(`All commands © 2020 bluebot.xyz`, client.user.displayAvatarURL());
        if(command.description) embed.addField("Description", command.description)
        if(command.aliases) embed.addField("Aliases", command.aliases.map(a => `\`${a}\``).join(", "))
        if(command.usage) embed.addField("Usage", "`" + command.usage + "`")

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;

      let emx = new MessageEmbed()
        .setColor(config.color)
        .setAuthor(`Commands for ${client.user.username}`, client.user.displayAvatarURL({ dynamic: true }))
        .setFooter(`All commands © 2020 bluebot.xyz`, client.user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ dynamic: true, size: 512 }));

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for(const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = `\`${prefix}${value.join(`\`, \`${prefix}`)}\``;

        emx.addField(`${category.toUpperCase()} [${value.length}]`, desc);
      }

      let database = db.get(`bluebot_cmd_${message.guild.id}`)

      if(database && database.length) {
        let array =[]
        database.forEach(m => {
          array.push(`\`${prefix}${m.name}\``)
        })

        emx.addField(`CUSTOM COMMANDS [${database.length}]`, array.join(", "))
      }

      return message.channel.send(emx);
    }
  }
};
