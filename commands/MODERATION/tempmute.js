const discord = require("discord.js");
const ms = require("ms")

module.exports = {
  name: "tempmute",
  description: "TempMute Command",
  category: "Mod",
  usage: "z!tempmute <@user> <time> <reason>",
  run: async(client, message, args, prefix, config) => {
    
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("You Don't Have Enough Perms!")
      return message.channel.send(embed)
    }

    if(!message.guild.me.hasPermission("MANAGE_ROLES")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("I Don't Have Enough Perms!")
      return message.channel.send(embed)
    }

    let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0]);
    if(!user) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("Please Mention a User To tempmute!")
      return message.channel.send(embed)
    }

    let time = args[1];
    if(!time || isNaN(ms(time))) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("Please Provide a Valid Time!")
      return message.channel.send(embed);
    }

    let reason = args.slice(2).join(" ");
    if(!reason) {
      reason = "No Reason"
    }

    if(!user.kickable) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("I Can't Mute This Person!")
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
      .setDescription("This User Is Already Muted!")
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
      .setTitle("I Have Muted This Person!")
      .setDescription("Successfully Muted!")
      .addField("Mod:", message.author, true)
      .addField("Muted For:", time, true)
      message.channel.send(embed)
      user.send(`You Were Muted In ${message.guild.id} For ${time} For The Reason: ${reason}`).catch()
      setTimeout(() => {
        user.roles.remove(mute.id)
      }, ms(time))
    })

  }
}