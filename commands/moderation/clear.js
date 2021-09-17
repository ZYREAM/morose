const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
require('discord-reply');


module.exports = {
    name: 'clear',
    aliases: [],
    category: 'Moderation',
    utilisation: '{prefix}ban <numbre>',
  
    execute(client, message, args) {

        message.delete();

        var you_not = new MessageEmbed()
        .setColor('#9b9b9b')
        .setTitle("<a:non:873277850520813618> Vous n'avez pas l'autorisation")
        .setThumbnail("https://cdn.discordapp.com/attachments/729461027686711422/730015476004028486/4c2218f5cc96ba76c0e590cd1dadb1bc.gif")
            
        var not_men = new MessageEmbed()
        .setColor('#9b9b9b')
        .setDescription("<a:non:873277850520813618> vous n'avez pas indiqué le nombre de messages supprimés")
         .setThumbnail("https://cdn.discordapp.com/attachments/729461027686711422/730017004026593321/giphy.gif")
           
        var validat = new MessageEmbed()
        .setColor('#9b9b9b')
      .setDescription("<a:oui:873277851695206401> message supprimé ")
     
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReplyNoMention(you_not);
    if(!args[0]) return message.lineReplyNoMention(not_men);
    message.channel.bulkDelete(args[0]).then(() => {
      message.lineReplyNoMention(validat).then(msg => {
            msg.delete({ timeout: 5000 })
          })

    })
console.log("staff command")
}
}