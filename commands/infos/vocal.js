const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require('discord-reply');

module.exports = {
    name: 'vocal',
    aliases: ['vc'],
	category: 'Infos',
    utilisation: '{prefix}servinfo',
execute(client, message, args) {
    if (message.channel.type == "dm") return
        let size = message.guild.members.cache.filter(m => m.voice.channel).size
        const embed = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
            .setAuthor("En Vocal")
            .addField("Il y a actuellement :", `${size} utilisateurs`)
            .setTimestamp()
            message.lineReplyNoMention(embed)
    }
}