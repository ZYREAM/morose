const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');
const  cc  = ('#a800fd')
require('discord-reply');
const db = require('quick.db');
module.exports = {
  name: 'ban',
  aliases: [],
  category: 'Moderation',
  utilisation: '{prefix}ban <@membre> <@raison>',
  async execute(bot, message, args) {
    try {
        if (!message.member.hasPermission("BAN_MEMBERS") && !ownerID .includes(message.author.id)) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous n'avez pas les autorisations pour interdire les utilisateurs! - [BAN_MEMBERS]**");
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReplyNoMention("**<a:non:873277850520813618> Je n'ai pas les autorisations pour ban les utilisateurs ! - [BAN_MEMBERS]**");
        if (!args[0]) return message.lineReplyNoMention("**<a:non:873277850520813618> Veuillez fournir un utilisateur à ban !**")

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!banMember) return message.lineReplyNoMention("**<a:non:873277850520813618> L'utilisateur n'est pas dans le serveur**");
        if (banMember === message.member) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous ne pouvez pas vous ban**")

        var reason = args.slice(1).join(" ");

        if (!banMember.bannable) return message.lineReplyNoMention("**<a:non:873277850520813618> Je ne peux pas ban cet utilisateur**")
        try {
        message.guild.members.ban(banMember)
        banMember.send(`**Bonjour, vous avez été banni de ${message.guild.name} pour - ${reason || "Sans raison"}**`).catch(() => null)
        } catch {
            message.guild.members.ban(banMember)
        }
        if (reason) {
        var sembed = new MessageEmbed()
        .setColor('#9b9b9b')
            .setDescription(`**<a:oui:873277851695206401> ${banMember.user.username}** a été banni pour ${reason}`)
            message.lineReplyNoMention(sembed)
        } else {
            var sembed2 = new MessageEmbed()
            .setColor('#9b9b9b')
            .setDescription(`**<a:oui:873277851695206401> ${banMember.user.username}** a été banni`)
            message.lineReplyNoMention(sembed2)
        }
        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (channel == null) return;

        if (!channel) return;

        const embed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor('#9b9b9b')
            .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "ban")
            .addField("**Banni**", banMember.user.username)
            .addField("**ID**", `${banMember.id}`)
            .addField("**Banni par**", message.author.username)
            .addField("**Raison**", `${reason || "**Sans raison**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)
    } catch (e) {
        return message.lineReplyNoMention(`**${e.message}**`)
    }
}
};