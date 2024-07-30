const discord = require("discord.js");
const config = require('../../config.json');

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  usage: "avatar @user",
  aliases: ["av"],
  category: "INFO",
  run: async (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    let embed = new discord.MessageEmbed()
    .setColor(config.color)
    .addField('Links', `**[PNG](${member.user.displayAvatarURL({ dynamic: true, format: 'png' })}) | [JPG](${member.user.displayAvatarURL({ dynamic: true, format: 'jpg' })}) | [GIF](${member.user.displayAvatarURL({ dynamic: true, format: 'gif' })})**`)
    .setImage(member.user.displayAvatarURL({ dynamic: true }));

    message.channel.send(embed);
  }
}