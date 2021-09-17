const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, messagesfetchlimts, yes, arrowhere, botlog, no } = yaml.load(fs.readFileSync("./config.yml"));
require('discord-reply');
module.exports = {
        name: "remove-backup",
        category: "Backup",
        utilisation: '{prefix}remove-backup <id backup>',
    async execute(client, message, args) {

        let backupID = args[0];
        if(!backupID){
            let notvaild = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`<a:non:873277850520813618> Vous devez spécifier un ID de sauvegarde valide à supprimer ${no}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#9b9b9b')
                
            return message.lineReplyNoMention(notvaild);
        }
        backup.fetch(backupID).then((backupInfos) => {
            backup.remove(backupID)
             let backups = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL())
           .setDescription(`**SUPPRIMER LA SAUVEGARDE**`)
           .setFooter(client.user.username, client.user.displayAvatarURL())
           .setColor('#9b9b9b')
           client.channels.cache.get(botlog).send(`** NOUVELLE SAUVEGARDE SUPPRIMÉE**\n Auteur: ${message.author.username}`)
           message.lineReplyNoMention(backups)
}).catch((err) => {
    let nobackupfound = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`<a:non:873277850520813618> Aucune sauvegarde trouvée pour ${backupID} ${attention}`)
    .setFooter(message.author.username, message.author.displayAvatarURL())
    .setColor('#9b9b9b')
    return message.lineReplyNoMention(nobackupfound);
});
    }
} 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    