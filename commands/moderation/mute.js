const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
require('discord-reply');
module.exports = {
        name: "mute",
        description: "Mutes a member in the discord!",
        utilisation: "[name | nickname | mention | ID] <reason> (optional)",
        category: 'Moderation',
    async execute(client, message, args) {
        try {
            if (!message.member.hasPermission("MANAGE_GUILD")) return message.lineReplyNoMention("**<a:non:873277850520813618> Vous n'êtes pas autorisé à mute quelqu'un! - [MANAGE_GUILD]**");

            if (!message.guild.me.hasPermission("MANAGE_GUILD")) return message.lineReplyNoMention("**<a:non:873277850520813618> Je n'ai pas l'autorisation de mute quelqu'un ! - [MANAGE_GUILD]**")
            if (!args[0]) return message.lineReplyNoMention("**<a:non:873277850520813618> Veuillez saisir un utilisateur à mute !**");

            var mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!mutee) return message.lineReplyNoMention("**<a:non:873277850520813618> Veuillez entrer un utilisateur valide à mute !**");

            if (mutee === message.member) return mmessage.lineReplyNoMention("**<a:non:873277850520813618> Vous ne pouvez pas vous mute !**")
            if (mutee.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.lineReplyNoMention('**<a:non:873277850520813618> Cannot Mute This User!**')

            let reason = args.slice(1).join(" ");
            if (mutee.user.bot) return message.lineReplyNoMention("**<a:non:873277850520813618> Impossible de mute les bots!**");
            const userRoles = mutee.roles.cache
                .filter(r => r.id !== message.guild.id)
                .map(r => r.id)

            let muterole;
            let dbmute = await db.fetch(`muterole_${message.guild.id}`);
            let muteerole = message.guild.roles.cache.find(r => r.name === "muted")

            if (!message.guild.roles.cache.has(dbmute)) {
                muterole = muteerole
            } else {
                muterole = message.guild.roles.cache.get(dbmute)
            }

            if (!muterole) {
                try {
                    muterole = await message.guild.roles.create({
                        data: {
                            name: "muted",
                            color: "#9b9b9b",
                            permissions: []
                        }
                    })
                    message.guild.channels.cache.forEach(async (channel) => {
                        await channel.createOverwrite(muterole, {
                            SEND_MESSAGES: false,
                            ADD_REACTIONS: false,
                            SPEAK: false,
                            CONNECT: false,
                        })
                    })
                } catch (e) {
                    console.log(e);
                }
            };

            if (mutee.roles.cache.has(muterole.id)) return message.lineReplyNoMention("**<a:non:873277850520813618> L'utilisateur est déjà mute !**")

            db.set(`muteeid_${message.guild.id}_${mutee.id}`, userRoles)
          try {
            mutee.roles.set([muterole.id]).then(() => {
                mutee.send(`**Bonjour, vous avez été mute sur ${message.guild.name} pour - ${reason || "Sans raison"}`).catch(() => null)
            })
            } catch {
                 mutee.roles.set([muterole.id])                               
            }
                if (reason) {
                const sembed = new MessageEmbed()
                .setColor('#9b9b9b')
                    .setAuthor(message.guild.name, message.guild.iconURL())
                    .setDescription(`<a:oui:873277851695206401> ${mutee.user.username} a été mute avec succès pour ${reason}`)
                    message.lineReplyNoMention(sembed);
                } else {
                    const sembed2 = new MessageEmbed()
                    .setColor('#9b9b9b')
                    .setDescription(`<a:oui:873277851695206401> ${mutee.user.username} a été mute avec succès`)
                    message.lineReplyNoMention(sembed2);
                }
            
            let channel = db.fetch(`modlog_${message.guild.id}`)
            if (!channel) return;

            let embed = new MessageEmbed()
            .setColor('#9b9b9b')
                .setThumbnail(mutee.user.displayAvatarURL({ dynamic: true }))
                .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
                .addField("**Moderation**", "mute")
                .addField("**Mute**", mutee.user.username)
                .addField("**Moderateur**", message.author.username)
                .addField("**Raison**", `${reason || "**Sans Raison**"}`)
                .addField("**Date**", message.createdAt.toLocaleString())
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                .setTimestamp()

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(embed)
        } catch {
            return;
        }
    }
}