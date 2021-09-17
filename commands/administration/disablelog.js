const db = require('quick.db');
require('discord-reply');
module.exports = {
        name: "disablelog",
        aliases: ['dmc', 'disablem', 'disablemodlog'],
        category: 'Administration',
        utilisation: '[channel name | channel mention | channel ID]',
        async execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous n'avez pas les autorisations requises ! - [ADMINISTRATOR]**")

        try {
            let a = db.fetch(`modlog_${message.guild.id}`)

            if (!a) {
                return message.lineReplyNoMention('**<a:non:873277850520813618> Il n\'y a pas de salon Modlog défini à désactiver !**')
            } else {
                let channel = message.guild.channels.cache.get(a)
                bot.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**<a:oui:873277851695206401> Salon de log désactivé!**")
                db.delete(`modlog_${message.guild.id}`)

                message.lineReplyNoMention(`**<a:oui:873277851695206401> Le salon Modlog a été désactivé avec succès dans \`${channel.name}\`**`)
            }
            return;
        } catch {
            return message.lineReplyNoMention("**<a:non:873277850520813618> Erreur - `Autorisations manquantes ou le salon n'existe pas`**")
        }
    }
} 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    