const discord = require('discord.js');

module.exports = {
    name: "poll",
      description: "Send a poll!",
      category: "MODERATION",
      usage: "poll <poll>",
      run: async (client, message, args, prefix, config) => {

        if(!message.member.hasPermission("MANAGE_MESSAGES")) {
          let embed = new discord.MessageEmbed()
          .setColor(config.color)
          .setDescription("❌ You do not have enough permissions! You need Manage Messages permissions.")
        }

        let poll = args.join(" ");
        if(!poll) {
          let embed = new discord.MessageEmbed()
          .setColor(config.color)
          .setDescription("❌ Please provide a poll!")
          return message.channel.send(embed);
        };

        let pollchannel = await message.guild.channels.cache.find(ch => ch.name.includes("poll"));
        if(!pollchannel) {
          let embed = new discord.MessageEmbed()
          .setColor(config.color)
          .setDescription("❌ There is no channel named `poll`! Please create a channel name that includes `poll` in it!")
          return message.channel.send(embed);
        }

        let pollembed = new discord.MessageEmbed()
        .setTitle("Poll!")
        .setColor("RANDOM")
        .setDescription(poll)
        .setFooter(`Poll by ${message.author.username}`)
        .setTimestamp()
        await pollchannel.send(pollembed).then(async (m) => {
          message.channel.send(`Poll sent to ${pollchannel}!`).then(m => m.delete({ timeout: 2000 }))
          await m.react("👍")
          await m.react("👎")
          }).catch(err => {
          return message.channel.send("❌ There was a error!")
        })

    }
}