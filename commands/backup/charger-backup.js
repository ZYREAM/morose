const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const backup = require("discord-backup")
const { PREFIX } = require('../../config');
const { attention, permission, messagesfetchlimts, yes, arrowhere, botlog } = yaml.load(fs.readFileSync("./config.yml"));
require('discord-reply');
module.exports = {
        name: "charger-backup",
        category: "Backup",
        utilisation: '{prefix}charger-backup <id backup>',
    async execute(client, message, args) {
 
      
      const guildicon2 = message.guild.iconURL()

      if(!message.member.hasPermission("ADMINISTRATOR", "MANAGE_GUILD")){
        let permissionsembed = new Discord.MessageEmbed()
        .setTitle(`${attention} **Permissions manquantes**`)
        .setDescription(`${permission} Vous devez avoir [ADMINISTRATOR, MANAGE_GUILD] comme permissions pour utiliser cette commande!`)
        .setFooter(message.guild.name, client.user.displayAvatarURL())
        .setColor('#9b9b9b')
        message.lineReplyNoMention(permissionsembed)
         return;
    }
    let backupID = args[0];
    if(!backupID){
       let Speficyid = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`${attention} Vous devez spécifier un ID de sauvegarde Valide!`)
      .setFooter(message.guild.name, guildicon2)
      .setColor('#9b9b9b')

        return message.lineReplyNoMention(Speficyid);
    }
    backup.fetch(backupID).then(async () => {

	let prefix;
        let fetched = await db.fetch(`prefix_${message.guild.id}`);

        if (fetched === null) {
            prefix = PREFIX
        } else {
            prefix = fetched
        }

      let warning = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setDescription(`:warning: | Lorsque la sauvegarde est chargée, tous les salon, rôles, etc. seront remplacés! Tape **$confirm** pour confirmer!!`)
      .setFooter(message.guild.name, guildicon2)
      .setColor('#9b9b9b')

         message.channel.send(warning);
            await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === $ + "confirm"), {
                max: 1,
                time: 20000,
                errors: ["time"]
            }).catch((err) => {
              let guildicon2 = message.guild.iconURL()
              let timeisup = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setDescription(`${attention} Le temps est écoulé! Chargement de sauvegarde annulé!`)
              .setFooter(message.guild.name, guildicon2)
              .setColor('#9b9b9b')

                 return message.lineReplyNoMention(timeisup);
            });
             let loadingstarting = new Discord.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setDescription(`<a:oui:873277851695206401> Commencez à charger la sauvegarde!`)
            .setFooter(message.guild.name, guildicon2)
            .setColor('#9b9b9b')

             message.channel.send(loadingstarting);
               
             backup.load(backupID, message.guild).then(() => {
            }).catch((err) => {
               let permissionserorr = new Discord.MessageEmbed()
              .setAuthor(message.author.username, message.author.displayAvatarURL())
              .setDescription(`${attention}  Désolé, une erreur s'est produite ... Veuillez vérifier que je dispose des autorisations d'administrateur!`)
              .setFooter(message.guild.name, guildicon2)
              .setColor('#9b9b9b')

                 return message.author.send(permissionserorr);
            });
    }).catch((err) => {
        console.log(err);
         let nobackupfound = new Discord.MessageEmbed()
        .setAuthor(message.author.username, message.author.displayAvatarURL())
        .setDescription(`${attention} Aucune sauvegarde trouvée pour ${backupID}!`)
        .setFooter(message.guild.name, guildicon2)
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