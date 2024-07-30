const discord = require('discord.js');
const client = new discord.Client();
const db = require('quick.db');
const config = require('./config.json');
const fs = require('fs');
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
const path = require('path');
const { createCanvas, loadImage, registerFont } = require('canvas');

registerFont(path.join(__dirname, './', 'fonts', 'abraham.demo.ttf'), { family: 'abraham demo' });

["command"].forEach(handler => { 
    require(`./handlers/${handler}`)(client)
  })

client.on('ready', () => {
    console.log(`${client.user.tag} is online`);
    client.user.setActivity(`${config.default_prefix}help | bluebot.xyz`)
});

client.on("message", async message => {

    let prefix = db.get(`bluebot_prefix_${message.guild.id}`);
    if(prefix === null) prefix = config.default_prefix;

    if(message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
      let embed = new discord.MessageEmbed()
      .setColor(config.color)
      .setDescription(`My Prefix in this server is **${prefix}**\nUse **${prefix}help** for all commands!`);
      message.channel.send(embed);
    }

    if(message.author.bot) return;
      if(!message.guild) return;
      if(!message.content.startsWith(prefix)) return;
      
         if (!message.member) message.member = await message.guild.fetchMember(message);
    
        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;

        let cmdx = db.get(`bluebot_cmd_${message.guild.id}`)
        
        if(cmdx) {
          let cmdy = cmdx.find(x => x.name === cmd)
          if(cmdy) message.channel.send(cmdy.responce)
          }
        
        let command = client.commands.get(cmd);
        if (!command) command = client.commands.get(client.aliases.get(cmd));
    
        if (command) 
            command.run(client, message, args, prefix, config);
});

client.on('guildMemberAdd', async member => {

  let image = db.get(`bluebot_welcomeImage_${member.guild.id}`);

  if(!image) {

  let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
  let channel = member.guild.channels.cache.get(channel_id);
  if (channel === null || !channel) return;
  let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
  if (!tex) tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`
  let text = tex.replace('{server.name}', member.guild.name).replace('{server.member.count}', member.guild.memberCount).replace('{server.id}', member.guild.id).replace('{server.human.count}', member.guild.members.cache.filter(m => !m.user.bot).size).replace('{server.bot.count}', member.guild.members.cache.filter(m => m.user.bot).size).replace('{member.name}', member.user.username).replace('{member.mention}', member).replace('{member.tag}', member.user.tag).replace('{member.id}', member.user.id).replace('{member.discriminstor}', member.user.discriminator);
  channel.send(text);
  }

  if(image) {

    let user_name = member.user.username.length > 9 ? `${member.user.username.substring(0, 9)}...` : member.user.username;
    let guild_name = member.guild.name.length > 11 ? `${member.guild.name.substring(0, 11)}...` : member.guild.name;
    let canvas = createCanvas(1024, 450);
    let ctx = canvas.getContext('2d');
    let background = await loadImage("https://media.discordapp.net/attachments/740842537043886140/743030040991891476/welcome-image-blank.png?width=400&height=176")
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height)
    
    ctx.font = "65px abraham demo"
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`Hello ${user_name}#${user.discriminator}!`, 350, 115)
    ctx.fillText(`Welcome to ${guild_name}`, 350, 245)
    ctx.fillText(`You are ${member.guild.memberCount}'th member`, 350, 370)

    ctx.font = "30px abraham demo"
    ctx.fillStyle = "#ccccff";
    ctx.fillText(` `, 157, 420)
    
    ctx.arc(180, 227, 135, 0, Math.PI * 2, true)
    ctx.lineWidth = 7;
    ctx.strokeStyle = "#3498db";
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    
    let avatar = await loadImage(user.displayAvatarURL({ format: "png" }));
    ctx.drawImage(avatar, 45, 93, 270, 270)
    let img = new discord.MessageAttachment(canvas.toBuffer(), 'welcome.png')

    let channel_id = db.get(`bluebot_welcomeChannel_${member.guild.id}`);
    let channel = member.guild.channels.cache.get(channel_id);
    if (channel === null || !channel) return;
    let tex = db.get(`bluebot_welcomeText_${member.guild.id}`);
    if (!tex) tex = `**Welcome To \`${member.guild.name}\`\nYou are \`${member.guild.memberCount}th\` member**`
    let text = tex.replace('{server.name}', member.guild.name).replace('{server.member.count}', member.guild.memberCount).replace('{server.id}', member.guild.id).replace('{server.human.count}', member.guild.members.cache.filter(m => !m.user.bot).size).replace('{server.bot.count}', member.guild.members.cache.filter(m => m.user.bot).size).replace('{member.name}', member.user.username).replace('{member.mention}', member).replace('{member.tag}', member.user.tag).replace('{member.id}', member.user.id).replace('{member.discriminstor}', member.user.discriminator);
    channel.send(text, img);
  }
});

client.login(config.token).catch(e => console.log(`ERR0R\n${e}`));const Database = require("@replit/database")