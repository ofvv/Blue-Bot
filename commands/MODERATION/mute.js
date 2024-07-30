const discord = require("discord.js");

module.exports = {
  name: "mute",
  description: "Mute people",
  category: "MODERATION",
  usage: "mute <@user> <reason>",
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
      .setDescription(":x: Please mention a user to mute!")
      return message.channel.send(embed)
    }

    let reason = args.slice(1).join(" ");
    if(!reason) {
      reason = "No reason provided."
    }

    if(!user.kickable) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(":x: Cannot mute them!")
    }

    let mute = await message.guild.roles.cache.find(r => r.name === "Muted");
    if(!mute) {
      message.guild.roles.create({
        data: {
          name: "Muted",
          color: "#000000",
          permissions: {
            "SEND_MESSAGES": false
          }
        }
      })
    };

    if(user.roles.cache.has(mute.id)) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("The user is already muted!")
      return message.channel.send(embed);
    }

    user.roles.add(mute.id).then(() => {
      message.guild.channels.cache.forEach(ch => {
        ch.updateOverwrite(mute, {
          SEND_MESSAGES: false
        })
      })
      let embed = new discord.MessageEmbed()
      .setColor(config.success)
      .setTitle("MUTED USER")
      .setDescription("Successfully Muted " + user.user.username)
      .addField("Muted By", message.author, true)
      message.channel.send(embed)
      user.send(`You were muted in ${message.guild.id} with the reason: ${reason}`).catch()
    })

  }
}