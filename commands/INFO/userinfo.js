const discord = require('discord.js');
const config = require('../../config.json')
const moment = require('moment');

const flags = {
	DISCORD_EMPLOYEE: '<:DiscordStaff:741596178898223185>',
	DISCORD_PARTNER: '<:discordPartner:741607512159289368>',
	BUGHUNTER_LEVEL_1: '<:BugHunter:741595875658301450>',
	BUGHUNTER_LEVEL_2: '<:CH_BadgeBugHunterGold:741607278901461014>',
	HYPESQUAD_EVENTS: '<:HypeSquadEvents:741596079786819684>',
	HOUSE_BRAVERY: '<:HypeSquadBravery:741596002196389999>',
	HOUSE_BRILLIANCE: '<:HypeSquadBriliance:741596046442102855>',
	HOUSE_BALANCE: '<:HypeSquadBalance:741595973750620241>',
	EARLY_SUPPORTER: '<:EarlySupporter:741607915819106337>',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: '<:verifiedBot:741596117237760020>',
	VERIFIED_DEVELOPER: '<:VerifiedBotDeveloper:741595938824650793>'
};

module.exports = {
    name: "userinfo",
	category: "INFO",
	aliases: ["whois"],
    description: "Get information for Discord user",
    run: (client, message, args) => {
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		let userFlags = member.user.flags.toArray();
		let embed = new discord.MessageEmbed()
		.setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
		.setColor(config.color)
		.setTimestamp()
		.setFooter(`ID • ${member.id}`)
		.setDescription(`**Username:** ${member.user.tag}\n**Badges:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : '0'}\n**Playing:** ${member.user.presence.game || 'Not playing a game.'}\n**Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest}\n**Created At:** ${moment(member.user.createdTimestamp).format('LL LTS')}\n**Joined At:** ${moment(member.joinedAt).format('LL LTS')}`)
		message.channel.send(embed)
    }
}