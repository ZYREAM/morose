const Discord = require ('discord.js')
const { stripIndents } = require("common-tags");
const  cc  = ('#a800fd')
require('discord-reply');
module.exports = {
    name: 'slow',
    aliases: [],
    category: 'Moderation',
    utilisation: '{prefix}slow <temps en secondes> ex: {prefix}slow 20',

    execute(client, message, args) {

    if (!message.member.hasPermission('MANAGE_MESSAGES')) {
        return message.lineReplyNoMention(new Discord.MessageEmbed()
        .setTitle('<a:non:873277850520813618> Vous n\'avez pas l\'autorisation')

        .setColor('#9b9b9b')
)
    };

    if (!args[0])
      return message.lineReplyNoMention(new Discord.MessageEmbed()
      .setTitle('<a:non:873277850520813618> Numéro non valide')
      .setColor('#9b9b9b')
);
    if (isNaN(args[0])) return message.lineReplyNoMention(new Discord.MessageEmbed()
    .setTitle('<a:non:873277850520813618> Le nombre n\'est pas une fonction!')
    .setColor("#9b9b9b")
);
    message.channel.setRateLimitPerUser(args[0]);
    message.lineReplyNoMention(new Discord.MessageEmbed()
    .setTitle(`<a:oui:873277851695206401> Slowmode **${args[0]}s**`)
    .setColor('#9b9b9b')

    );
  },
           
    
};