const Discord = require('discord.js')
require('discord-reply');
module.exports = {
        name: "lockdown",
        description: "lock tout les salons en une seul commandes",
        category: 'Moderation',
        aliases: ['ld'],
        utilisation: "{prefix}lockdown <on> / off>",
        async execute(client, message, args) {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**<a:non:873277850520813618> Erreur d'autorisation de l'utilisateur!**")
        .setDescription("**<a:non:873277850520813618> Désolé, vous n'êtes pas autorisé à l'utiliser! ❌**")
        .setColor('#9b9b9b')
        
        if(!message.channel.permissionsFor(message.member).has("BAN_MEMBERS") ) return message.channel.send(lockPermErr);

        const channels = message.guild.channels.cache.filter(ch => ch.type !== 'category');
        if (args[0] === 'on') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: false
                })
            })
            
            let lockEmbed = new Discord.MessageEmbed()
                
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\n<a:oui:873277851695206401> Terminé ! Serveur entièrement verrouillé ! 🔒**`)
                .setColor('#9b9b9b')
            return message.lineReplyNoMention(lockEmbed);

        } else if (args[0] === 'off') {
            channels.forEach(channel => {
                channel.updateOverwrite(message.guild.roles.everyone, {
                    SEND_MESSAGES: true
                })
            })
            
            let lockEmbed2 = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setThumbnail(`https://media.giphy.com/media/JozO6wdFcC81VPO6RS/giphy.gif`)
                .setDescription(`**\n\n<a:oui:873277851695206401> Terminé ! Serveur entièrement débloqué ! 🔓**`)
            return message.lineReplyNoMention(lockEmbed2)
        }
    }
}