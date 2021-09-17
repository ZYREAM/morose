const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require('discord-reply');

module.exports = {
    name: 'servinfo',
    aliases: ['si'],
	category: 'Infos',
    utilisation: '{prefix}servinfo',
execute(client, message, args) {

		var sinfo_embed = new Discord.MessageEmbed()
		.setColor('#9b9b9b')
		.setThumbnail(`https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif`)
		.setTitle(`Informations | ${message.guild}`)
		.addField(":id: Server name:", `≫ \`${message.guild.name}\``)
		.addField(":crown: Owner :", `≫ \`${message.guild.owner}\``)
		.addField(":calendar: Create :", `≫ \`${message.guild.createdAt.getDay()} / ${message.guild.createdAt.getMonth()} / ${message.guild.createdAt.getFullYear()}\``)
		.addField("👤 Member count :", `≫ \`${message.guild.memberCount}\``)
		.addField("📜 Channels count :", `≫ \`${message.guild.channels.cache.size}\``)
		.addField("🌍 Region :", `≫ \`${message.guild.region}\``)
		.addField("Image", `[Link](https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif)`)
		message.lineReplyNoMention(sinfo_embed)

		console.log("command")
	}
}