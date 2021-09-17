const Discord = require('discord.js');
const { Console } = require('console');
require('discord-reply');
module.exports = {
        name: "lock",
        description: "lock channel",
        category: 'Moderation',
        aliases: [],
    async execute(client, message, args) {
        let lockPermErr = new Discord.MessageEmbed()
        .setColor('#9b9b9b')
        .setTitle("**<a:non:873277850520813618> Erreur d'autorisation de l'utilisateur!**")
        .setDescription("**<a:non:873277850520813618> Désolé, vous n'êtes pas autorisé à l'utiliser ! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has("ADMINISTRATOR") ) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.createOverwrite(role, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.lineReplyNoMention(`<a:oui:873277851695206401> Terminé | Chaîne verrouillée !`);
    }
}