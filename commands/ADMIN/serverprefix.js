const discord = require("discord.js");
const config = require('../../config.json');
const db = require("quick.db");

module.exports = {
name: "serverprefix",
  description: "Set the server prefix for Bluebot",
  category: "ADMIN",
  usage: "serverprefix {new prefix}",
  run: async (client, message, args) => {

    if(!message.member.hasPermission("ADMINISTRATOR")) {

      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ You don't have permission: \`ADMINISTRATOR\``);

      return message.channel.send(embed);
    }

    if(!args[0]) {

      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ Please give the prefix that you want to set");

      return message.channel.send(embed)
    } 
    
    if(args[1]) {

      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ You can not set prefix a double argument");
      return message.channel.send(embed)
    }
    
    if(args[0].length > 3) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ You can not send prefix more than 3 characters");
      return message.channel.send(embed)
    }
    
    if(args[0] === db.get(`bluebot_prefix_${message.guild.id}`)) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ You can not set this prefix");
      return message.channel.send(embed)
    }

    if(args.join("") === config.default_prefix) {
      let embed = new discord.MessageEmbed()
      .setColor(config.success)
      .setDescription("✅ Success reseted prefix in this server")
      db.delete(`bluebot_prefix_${message.guild.id}`)
     return await message.channel.send(embed)
    }

    let embed = new discord.MessageEmbed()
    .setColor(config.success)
    .setDescription(`✅ Success seted the bot prefix in this server for: **${args[0]}**`);
    
    db.set(`bluebot_prefix_${message.guild.id}`, args[0])
    message.channel.send(embed);
  }
}