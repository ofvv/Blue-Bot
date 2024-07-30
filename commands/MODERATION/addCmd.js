const db = require("quick.db")
const discord = require('discord.js')

module.exports = {
  name: "addCmd",
  usage: "addCmd <command name> <command responce>",
  description: "Delete a custom commannd from the server",
  category: "MODERATION",
  aliases: ['addcmd'],
  run: async (client, message, args, prefix, config) => {

    if(!message.member.hasPermission("MANAGE_MESSAGES") && !message.member.hasPermission('ADMINISTRATOR')) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ You don't have a manage messages or administrator permission`);

      return message.channel.send(embed);
    }

    let cmdname = args[0];

    if(!cmdname) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ Please give me command name\n**Example: \`${prefix}addCmd <command name> <command responce>\`**`);

      return message.channel.send(embed);
    }

    let cmdresponce = args.slice(1).join(" ");

    if(!cmdresponce) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ Please give me command responce\n**Example: \`${prefix}addCmd <command name> <command responce>\`**`);

      return message.channel.send(embed);
    }

    let database = db.get(`bluebot_cmd_${message.guild.id}`)

    if(database && database.find(x => x.name === cmdname)) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ This command name is already added in this server custom commands`);

      return message.channel.send(embed);
    }

    let data = {
      name: cmdname,
      responce: cmdresponce
    }

    db.push(`bluebot_cmd_${message.guild.id}`, data);

    let embed = new discord.MessageEmbed()
    .setColor(config.success)
    .setDescription(`✅ Added \`${cmdname}\` in this server custom commands list`);

    message.channel.send(embed);

  }
}