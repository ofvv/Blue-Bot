const discord = require('discord.js');

module.exports = {
    name: "kick",
      description: "kick a user",
      category: "MODERATION",
      usage: "kick <@user>  <reason>",
      run: async (client, message, args, prefix, config) => {

  if(!message.member.hasPermission('KICK_MEMBERS') && !message.member.hasPermission('ADMINISTRATOR')) {
       let embed = new discord.MessageEmbed()
       .setColor(config.error)
       .setDescription("❌ You don't have a kick members or administrator permission");
      return message.channel.send(embed);
  }

    if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription("❌ I do not have permissions to kick members!");
      return message.channel.send(embed)
  }

let user = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag === args[0]) || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(m => m.user.username === args[0])
  if(!user) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ Please mention a user to kick!");
    return message.channel.send(embed)
  }
  
  if(user.id === message.author.id) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ You cannot kick yourself!")
    return message.channel.send(embed)
  }
  
  if(!user.bannable) {
    let embed = new discord.MessageEmbed()
    .setColor(config.error)
    .setDescription("❌ You cannot kick the user due to role hierarchy!")
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
  user.kick({ reason: reason });
  
    var embed = new discord.MessageEmbed()
    .setTitle("USER KICK")
    .setDescription(`${user.user.username} successfully kicked.`)
    .addField(`Kicked By :-`, `${message.author.username}`)
    .addField(`Reason :-`, `${reason}`)
    .setColor(config.success)
    message.channel.send(embed)
    
     var DmEmbed = new discord.MessageEmbed()
    .setTitle("You got kicked!")
    .addField(`Kick in :-`, `${message.guild.name}`)
    .addField(`Kicked By :-`, `${message.author.username}`)
    .addField(`Reason :-`, `${reason}`)
    .setColor(config.error)
    user.send(DmEmbed).catch(e => {
      return message.channel.send(`Couldn't send a DM to ${user.user.username} as their DMs were closed.`)
    })

    }
}