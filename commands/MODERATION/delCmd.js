const db = require("quick.db")
const discord = require('discord.js');

module.exports = {
  name: "delCmd",
  usage: "delCmd <command name>",
  description: "Delete a custom commannd from the server",
  category: "MODERATION",
  aliases: ['delcmd'],
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
      .setDescription(`❌ Please give me command name\n**Example: \`${prefix}delCmd <command name>\`**`);

      return message.channel.send(embed);
    }

    let database = db.get(`bluebot_cmd_${message.guild.id}`)

    if(database) {
      let data = database.find(x => x.name === cmdname)

      if(!data) {
        let embed = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription(`❌ Unable to find this command!`);

        return message.channel.send(embed);
      }

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

      db.set(`bluebot_cmd_${message.guild.id}`, filter)
      
      let embed = new discord.MessageEmbed()
      .setColor(config.success)
      .setDescription(`✅ Deleted \`${cmdname}\` from this server custom commands list`);
      
      message.channel.send(embed);

    } else {
      
      let embd = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription(`❌ Unable to find this command!`);

        return message.channel.send(embd);
      }

  }
}ite