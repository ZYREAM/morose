const Discord = require(`discord.js`);
const { MessageEmbed } = require('discord.js');
const  cc  = ('#a800fd')
require('discord-reply');
const db = require('quick.db');

module.exports = {
  name: 'unban',
  aliases: [],
  category: 'Moderation',
  utilisation: '{prefix}unban <@membre> <@raison>',
  async execute(bot, message, args) {

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous n'avez pas les autorisations pour UnBan de quelqu'un! - [BAN_MEMBERS]**")

    if (!args[0]) return message.lineReplyNoMention("**<a:non:873277850520813618> Please Enter A Name!**")
  
    let bannedMemberInfo = await message.guild.fetchBans()

    let bannedMember;
    bannedMember = bannedMemberInfo.find(b => b.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || bannedMemberInfo.get(args[0]) || bannedMemberInfo.find(bm => bm.user.tag.toLowerCase() === args[0].toLocaleLowerCase());
    if (!bannedMember) return message.lineReplyNoMention("**<a:non:873277850520813618> Veuillez fournir un nom d'utilisateur, une étiquette ou un identifiant valide ou l'utilisateur n'est pas ban!**")

    let reason = args.slice(1).join(" ")

    if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.lineReplyNoMention("**<a:non:873277850520813618> Je n'ai pas l'autorisation d'annuler le bannissement de quelqu'un! - [BAN_MEMBERS]**")
    try {
        if (reason) {
            message.guild.members.unban(bannedMember.user.id, reason)
            var sembed = new MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription(`**<a:oui:873277851695206401> ${bannedMember.user.tag} n'est plus ban pour ${reason}**`)
                message.lineReplyNoMention(sembed)
        } else {
            message.guild.members.unban(bannedMember.user.id, reason)
            var sembed2 = new MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription(`**<a:oui:873277851695206401> ${bannedMember.user.tag} n'est plus ban**`)
                message.lineReplyNoMention(sembed2)
        }
    } catch {
        
    }

    let channel = db.fetch(`modlog_${message.guild.id}`)
    if (!channel) return;

    let embed = new MessageEmbed()
    .setColor('#9b9b9b')
        .setThumbnail(bannedMember.user.displayAvatarURL({ dynamic: true }))
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .addField("**Moderation**", "unban")
        .addField("**DeBan**", `${bannedMember.user.username}`)
        .addField("**ID**", `${bannedMember.user.id}`)
        .addField("**Moderateur**", message.author.username)
        .addField("**Raison**", `${reason}` || "**Sans Raison**")
        .addField("**Date**", message.createdAt.toLocaleString())
        .setFooter(message.guild.name, message.guild.iconURL())
        .setTimestamp();

    var sChannel = message.guild.channels.cache.get(channel)
    if (!sChannel) return;
    sChannel.send(embed)
}
}