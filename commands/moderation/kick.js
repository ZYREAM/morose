const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');
const  cc  = ('#a800fd')
require('discord-reply');
const db = require('quick.db');

module.exports = {
  name: 'kick',
  aliases: [],
  category: 'Moderation',
  utilisation: '{prefix}kick <@membre>',
  execute(client, message, args) {
      try {
          if (!message.member.hasPermission("KICK_MEMBERS")) return message.lineReplyNoMention("**<a:non:873277850520813618> Yvous n'avez pas l'autorisation d'expulser des membres ! - [KICK_MEMBERS]**");
          if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.lineReplyNoMention("**<a:non:873277850520813618> Je n'ai pas les autorisations pour expulser les membres ! - [KICK_MEMBERS]**");

          if (!args[0]) return message.lineReplyNoMention('**<a:non:873277850520813618> Entrez un utilisateur à kick !**')

          var kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
          if (!kickMember) return message.lineReplyNoMention("**<a:non:873277850520813618> L'utilisateur n'est pas dans le serveur !**");

          if (kickMember.id === message.member.id) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous ne pouvez pas vous expulsez !**")

          if (!kickMember.kickable) return message.lineReplyNoMention("**<a:non:873277850520813618> Impossible d'expulser cet utilisateur !**")
          if (kickMember.user.bot) return message.lineReplyNoMention("**<a:non:873277850520813618> Impossible d'expulser cet utilisateur!**")

          var reason = args.slice(1).join(" ");
          try {
              const sembed2 = new MessageEmbed()
              .setColor('#9b9b9b')
                  .setDescription(`**<a:non:873277850520813618> Vous avez été expulsé de ${message.guild.name} pour - ${reason || "Sans raison !"}**`)
                  .setFooter(message.guild.name, message.guild.iconURL())
              kickMember.send(sembed2).then(() =>
                  kickMember.kick()).catch(() => null)
          } catch {
              kickMember.kick()
          }
          if (reason) {
          var sembed = new MessageEmbed()
          .setColor('#9b9b9b')
              .setDescription(`**<a:oui:873277851695206401> ${kickMember.user.username}** a été expulsé pour ${reason}`)
              message.lineReplyNoMention(sembed);
          } else {
              var sembed2 = new MessageEmbed()
              .setColor('#9b9b9b')
              .setDescription(`**<a:oui:873277851695206401> ${kickMember.user.username}** a été expulsé`)
              message.lineReplyNoMention(sembed2);
          }
          let channel = db.fetch(`modlog_${message.guild.id}`)
          if (!channel) return;

          const embed = new MessageEmbed()
              .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
              .setColor('#9b9b9b')
              .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
              .setFooter(message.guild.name, message.guild.iconURL())
              .addField("**Moderation**", "kick")
              .addField("**Utilisateur expulsé**", kickMember.user.username)
              .addField("**Expulsé par**", message.author.username)
              .addField("**Raison**", `${reason || "**Sans raison**"}`)
              .addField("**Date**", message.createdAt.toLocaleString())
              .setTimestamp();

          var sChannel = message.guild.channels.cache.get(channel)
          if (!sChannel) return;
          sChannel.send(embed)
      } catch (e) {
          return message.channel.send(`**${e.message}**`)
      }
  }
}