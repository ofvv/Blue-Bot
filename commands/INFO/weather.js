const discord = require("discord.js");
const weather = require('weather-js');

module.exports = {
name: "weather",
  description: "Weather Command",
  category: "Utility",
  usage: "z!weather [city]",
  run: async (client, message, args) => {

    if (!args.join(" ")) {
        let embed = new discord.MessageEmbed()
        .setColor("#000000")
        .setDescription("Please Provide An Valid Location")
        return message.channel.send(embed);
    }

    weather.find({search: args.join(" "), degreeType: 'C'}, function(err, result) {

        let embed = new discord.MessageEmbed()
        .setTitle(`Weather - ${result[0].location.name}`)
        .setColor(config.color)
        .setDescription("Temperature May Be Not 100% Accurate!")
        .addField("Temperature", `${result[0].current.temperature} Celcius`, true)
        .addField("Sky Text", result[0].current.skytext, true)
        .addField("Humidity", result[0].current.humidity, true)
        .addField("Wind Speed", result[0].current.windspeed, true)
        .addField("Observation Time", result[0].current.observationtime, true)
        .addField("Wind Display", result[0].current.winddisplay, true)
        .setThumbnail(result[0].current.imageUrl);
           message.channel.send(embed).catch(e => {

            if(e.length > 2000) return;
    
            let embed = new discord.MessageEmbed()
            .setColor("#000000")
            .setDescription(`An Error Has Occured! Please Try Again Later!`);
    
            message.channel.send(embed);
        })
        }); 
  }
}