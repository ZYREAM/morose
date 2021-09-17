const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, messagesfetchlimts, yes, arrowhere, botlog, no, load } = yaml.load(fs.readFileSync("./config.yml"));
require('discord-reply');
module.exports = {
        name: "cree-backup",
        category: "Backup",
        utilisation: '{prefix}cree-backup',
    async execute(client, message, args) {

		if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")){
          let permissionsembed = new Discord.MessageEmbed()
            .setTitle(`${attention} **Permissions manquantes**`)
            .setDescription(`${permission} Vous devez avoir [ADMINISTRATOR, MANAGE_GUILD] comme permissions pour utiliser cette commande!`)
            .setFooter(message.guild.name, client.user.displayAvatarURL())
            .setColor('#9b9b9b')
            message.lineReplyNoMention(permissionsembed)
             return;
        }
        message.lineReplyNoMention(`${load} Création d'une sauvegarde... `)
        backup.create(message.guild, {
            jsonBeautify: true,
            saveImages: "base64",
            maxMessagesPerChannel: messagesfetchlimts,
        }).then((backupData) => {
            let guildicon = message.guild.iconURL()
            let datacreated = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`<a:oui:873277851695206401> Nouvelle sauvegarde créée\n ${arrowhere} **ID BACKUP**: ${backupData.id}\n ${arrowhere} **Nom du Serveur**: ${message.guild.name} `)
            .setFooter(message.guild.name, guildicon)
            .setColor('#9b9b9b')
            message.lineReplyNoMention(datacreated);
             let created = new Discord.MessageEmbed()
             .setAuthor(message.author.username, message.author.displayAvatarURL())
             .setDescription(`<a:oui:873277851695206401> La sauvegarde a été créée `)
             .setFooter(message.guild.name, guildicon)
             .setColor('#9b9b9b')
    
             message.lineReplyNoMention(created);
        });
    }
} 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    