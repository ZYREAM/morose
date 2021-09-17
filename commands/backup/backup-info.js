const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { attention, permission, messagesfetchlimts, yes, arrowhere, botlog, no } = yaml.load(fs.readFileSync("./config.yml"));
require('discord-reply');
module.exports = {
        name: "backup-info",
        category: "Backup",
        utilisation: '{prefix}backup-info <id backup>',
    async execute(client, message, args)  {  
      let backupID = args[0];
		 // backupIDl = args[0]
        if(!backupID){
            let notvaild = new Discord.MessageEmbed()
            .setAuthor(client.user.username, client.user.displayAvatarURL)
            .setDescription(`${arrowhere} Vous devez spécifier un ID de sauvegarde valide ${no}`)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setColor('#9b9b9b')
                
            return message.lineReplyNoMention(notvaild);
        }
        backup.fetch(backupID).then((backupInfos) => {
            const date = new Date(backupInfos.data.createdTimestamp);
            const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
            const formatedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;
            let backups = new Discord.MessageEmbed()
           .setAuthor(message.author.username, message.author.displayAvatarURL())
           .setDescription(`** Info de la backup **\n ${arrowhere} ID BACKUP: ${backupInfos.id} \n ${arrowhere} ID du serveur: ${backupInfos.data.guildID} \n ${arrowhere} Taille de la sauvegarde ${backupInfos.size} mb \n ${arrowhere} Backup créé le : ${formatedDate}`)
           .setFooter(`${attention} Vilon`, client.user.displayAvatarURL())
           .setColor('#9b9b9b')
           message.lineReplyNoMention(backups)
	}).catch((err) => {
    let nobackupfound = new Discord.MessageEmbed()
    .setAuthor(client.user.username, client.user.displayAvatarURL)
    .setDescription(`Aucune sauvegarde trouvée pour ${backupID} ${attention}`)
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