const discord = require("discord.js");
const imdb = require("imdb-api");
const config = require('../../config.json')

module.exports = {
name: "imdb",
  description: "Get the information about series or movie",
  category: "INFO",
  usage: "imdb <name>",
  run: async (client, message, args) => {
    
    if(!args.join(" ")) {

        let embed = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription("❌ Please give the name of movie or series");

      return message.channel.send(embed);
    }
    
    const imob = new imdb.Client({apiKey: "5e36f0db"})
    
    let movie = await imob.get({'name': args.join(" ")}).catch(e => {

        if(e.length > 2000) return;

        let embed = new discord.MessageEmbed()
        .setColor(config.error)
        .setDescription(e);

        message.channel.send(embed);
    })
    
    let embed = new discord.MessageEmbed()
    .setTitle(movie.title)
    .setColor(config.color)
    .setThumbnail(movie.poster)
    .setDescription(movie.plot)
    .setFooter(`Rating: ${movie.rating}`)
    .addField("Country", movie.country, true)
    .addField("Languages", movie.languages, true)
    .addField("Type", movie.type, true);
    
    message.channel.send(embed).catch(e => {

      if(e.length > 2000) return;

      let embed = new discord.MessageEmbed()
      .setColor(config.error)
      .setDescription(`❌ ${e}`);

      message.channel.send(embed);
  })
    
  }

}