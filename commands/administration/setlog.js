const db = require("quick.db")
require('discord-reply');
module.exports = {
        name: "setlog",
        category: "Administration",
        aliases: ['setm', 'sm', 'smc', 'setmodlog'],
        utilisation: "[channel mention | channel ID | channel name]",
    async execute(client, message, args) {
        if (!message.member.hasPermission("ADMINISTRATOR")) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous n'avez pas les autorisations requises! - [ADMINISTRATOR]**")
    if (!args[0]) {
      let b = await db.fetch(`modlog_${message.guild.id}`);
      let channelName = message.guild.channels.cache.get(b);
      if (message.guild.channels.cache.has(b)) {
        return message.lineReplyNoMention(
          `**<a:oui:873277851695206401> L'ensemble des Modlog sur ce serveur est \`${channelName.name}\`!**`
        );
      } else
        return message.lineReplyNoMention(
          "**<a:non:873277850520813618> Veuillez entrer un nom de salon ou un identifiant à définir!**"
        );
    }
        let channel = message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]) || message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'text') return message.lineReplyNoMention("**<a:non:873277850520813618> Veuillez entrer un canal de texte valide!**");

        try {
            let a = await db.fetch(`modlog_${message.guild.id}`)

            if (channel.id === a) {
                return message.lineReplyNoMention("**<a:non:873277850520813618> Ce salon est déjà défini comme canal Modlog!**")
            } else {
                client.guilds.cache.get(message.guild.id).channels.cache.get(channel.id).send("**<a:oui:873277851695206401> Modlog Salon défini!**")
                db.set(`modlog_${message.guild.id}`, channel.id)

                message.lineReplyNoMention(`**<a:oui:873277851695206401> Le salon Modlog a été défini avec succès dans \`${channel.name}\`!**`)
            }
        } catch {
            return message.lineReplyNoMention("**<a:non:873277850520813618> Erreur - `Les autorisations manquantes ou le salon n'est pas un canal de texte !`**");
        }
    }
}; 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    