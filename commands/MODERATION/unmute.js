const discord = require("discord.js");

module.exports = {
  name: "unmute",
  description: "Unmute people",
  category: "MODERATION",
  usage: "unmute <@user> <reason>",
  run: async(client, message, args, prefix, config) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(":x: You need Manage Messages permission to run this command!")
      return message.channel.send(embed)
    }

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(":x: I need Manage Roles permission to run this command!")
      return message.channel.send(embed)
    }

    let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);
    if(!user) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(":x: Please mention a user to unmute!")
      return message.channel.send(embed)
    }

    let reason = args.slice(1).join(" ");
    if(!reason) {
      reason = "No reason provided."
    }

    let mute = await message.guild.roles.cache.find(r => r.name === "Muted");

    if(!user.roles.cache.has(mute.id)) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(":x: That user isn't muted!")
      return message.channel.send(embed);
    }

    await user.roles.remove(mute.id).catch(e => {
      console.log(e);
      return message.channel.send("There was a error!")
    })

    let embed = new discord.MessageEmbed()
    .setColor(config.success)
    .setDescription(`Unmuted ${user.user.username}`)
    message.channel.send(embed)
    user.send(`You got unmuted in ${message.guild.name}!`).catch()

  }
}