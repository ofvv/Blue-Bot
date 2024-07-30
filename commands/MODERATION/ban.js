const discord = require('discord.js');

module.exports = {
    name: "ban",
      description: "Ban a user",
      category: "MODERATION",
      usage: "ban <@user>  <reason>",
      run: async (client, message, args, prefix, config) => {

  if(!message.member.hasPermission('BAN_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
       let embed = new discord.MessageEmbed()
       .setColor(config.error)
       .setDescription("❌ You don't have a ban members or administrator permission");
      return message.channel.send(embed);
  }

    if(!message.guild.me.hasPermission("BAN_MEMBERS")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ I do not have permissions to ban members!");
      return message.channel.send(embed)
  }

let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0])
  if(!user) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ Please mention a user to ban!");
    return message.channel.send(embed)
  }
  
  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ You cannot ban yourself!")
    return message.channel.send(embed)
  }
  
  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ You cannot ban the user due to role hierarchy!")
    return message.channel.send(embed)
  }
  
  if (user.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) { 
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ That user is a moderator or a administrator! I cannot do that!");
    return message.channel.send(embed)
  }
  
  let reason = args.slice(1).join(" ");
  if(!reason) {
    reason = "No reason provided."
  }
  user.ban({ reason: reason });
  
    var embed = new discord.MessageEmbed()
    .setTitle("USER BANNED")
    .setDescription(`${user.user.username} successfully banned.`)
    .addField(`Banned By :-`, `${message.author.username}`)
    .addField(`Reason :-`, `${reason}`)
    .setColor(config.success)
    message.channel.send(embed)
    
     var DmEmbed = new discord.MessageEmbed()
    .setTitle("You got banned!")
    .addField(`Banned in :-`, `${message.guild.name}`)
    .addField(`Banned By :-`, `${message.author.username}`)
    .addField(`Reason :-`, `${reason}`)
    .setColor(config.error)
    user.send(DmEmbed).catch(e => {
      return message.channel.send(`Couldn't send a DM to ${user.user.username} as their DMs were closed.`)
    })

    }
}