const discord = require('discord.js');
const config = require('../../config.json')

module.exports = {
    name: "ping",
    category: "INFO",
    description: "Get bot ping",
    run: (client, message, args) => {
      message.channel.send("🏓Pinging...").then(m => {
      let ping = m.createdTimestamp - message.createdTimestamp
      m.edit(`\`\`\`${client.user.username}'s ping: ${ping}ms\nDiscord API: ${client.ws.ping}ms\`\`\``);
      });
    }
  }