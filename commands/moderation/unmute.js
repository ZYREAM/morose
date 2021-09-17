const { MessageEmbed } = require("discord.js")
const db = require('quick.db');
require('discord-reply');
module.exports = {
        name: "unmute",
        aliases: ["um"],
        description: "Unmutes a member in the discord!",
        utilisation: "[name | nickname | mention | ID] <reason> (optional)",
        category: "Moderation",
        async execute(client, message, args) {
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.lineReplyNoMention("**<a:non:873277850520813618> You Dont Have The Permissions To Unmute Someone!**");

        if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.lineReplyNoMention("**<a:non:873277850520813618> I Don't Have Permissions To Unmute Someone!**")
        if (!args[0]) return message.lineReplyNoMention("**<a:non:873277850520813618> Please Enter A User!**")
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!mutee) return message.lineReplyNoMention("**<a:non:873277850520813618> Please Enter A Valid User!**");

        let reason = args.slice(1).join(" ");

        let muterole;
        let dbmute = await db.fetch(`muterole_${message.guild.id}`);
        let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

        if (!message.guild.roles.cache.has(dbmute)) {
            muterole = muteerole
        } else {
            muterole = message.guild.roles.cache.get(dbmute)
        }
      
        let rolefetched = db.fetch(`muteeid_${message.guild.id}_${mutee.id}`)
        if (!rolefetched) return;

        if (!muterole) return message.lineReplyNoMention("**<a:non:873277850520813618> Il n'y a pas de rôle muet à supprimer!**")
        if (!mutee.roles.cache.has(muterole.id)) return message.lineReplyNoMention("**<a:non:873277850520813618> L'utilisateur n'est pas mute !**")
        try {
        mutee.roles.remove(muterole.id).then(() => {
            mutee.send(`**Bonjour, vous avez été unmute dans ${message.guild.name} pour ${reason || "Sans raison"}**`).catch(() => null)
            let roleadds = rolefetched
            if (!roleadds) return;
            mutee.roles.add(roleadds)
        })
        } catch {
            let roleadds2 = rolefetched
            if (!roleadds2) return;
            mutee.roles.add(roleadds2)                            
          }
            const sembed = new MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription(`<a:oui:873277851695206401> ${mutee.user.username} a été unmute avec succès.`)
                message.lineReplyNoMention(sembed);
        

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        let embed = new MessageEmbed()
        .setColor('#9b9b9b')
            .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .addField("**Moderation**", "unmute")
            .addField("**Unmute**", mutee.user.username)
            .addField("**Moderateur**", message.author.username)
            .addField("**Raison**", `${reason || "**Sans Raison**"}`)
            .addField("**Date**", message.createdAt.toLocaleString())
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setTimestamp();

        var sChannel = message.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send(embed)

    }
}