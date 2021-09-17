const Discord = require('discord.js');
const { Console } = require('console');
require('discord-reply');
module.exports = {
        name: "unlock",
        description: "unlock channel",
        aliases: [],
        category: 'Moderation',
    async execute(client, message, args) {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**<a:non:873277850520813618> Erreur d'autorisation de l'utilisateur !**")
        .setDescription("**<a:non:873277850520813618> Désolé, vous n'êtes pas autorisé à l'utiliser ! ❌**")
        .setColor('#9b9b9b')
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.lineReplyNoMention(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.lineReplyNoMention(`<a:oui:873277851695206401> Terminé | Chaîne déverrouillée !`);
    }
}