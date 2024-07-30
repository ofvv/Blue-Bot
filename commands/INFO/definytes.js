const discord = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: "definytes",
  description: "Get all definytes for welcome and leave message's",
  usage: "definytes",
  category: "INFO",
  run: async (client, message, args) => {

    let member = message.member;

    let embed = new discord.MessageEmbed()
    .setColor(config.color)
    .addField('{server.name}', message.guild.name, true)
    .addField('{server.member.count}', message.guild.memberCount, true)
    .addField('{server.id}', message.guild.id, true)
    .addField('{server.human.count}', message.guild.members.cache.filter(m => !m.user.bot).size, true)
    .addField('{server.bot.count}', message.guild.members.cache.filter(m => m.user.bot).size, true)
    .addField('{member.name}', member.user.username, true)
    .addField('{member.mention}', member, true)
    .addField('{member.tag}', member.user.tag, true)
    .addField('{member.id}', member.user.id, true)
    .addField('{member.discriminator}', member.user.discriminator, true);

    message.channel.send(embed);
  }
}