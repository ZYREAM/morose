const ms = require('ms');
const config = require("../../config.json")
require('discord-reply');
module.exports = {
        name: "start",
        utilisation: "{prefix}start <#salon <durée> <nombre gagnant> <récompense>",
        category: "Giveaway",
        async execute(client, message, args) {
        if (config["Giveaway_Options"].giveawayManagerID) {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.id === config["Giveaway_Options"].giveawayManagerID)) {
                return message.lineReplyNoMention(':boom: Vous devez avoir la permissions \`MANAGE_MESSAGES\` pour créer un giveaways.');
            }
        } else {
            if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
                return message.lineReplyNoMention(':boom: Vous devez avoir la permissions \`MANAGE_MESSAGES\` pour créer un giveaways.');
            }
        }

        let giveawayChannel = message.mentions.channels.first();
        if (!giveawayChannel) {
            return message.lineReplyNoMention(':boom: Uh oh, Je n\'ai pas trouvé ce salon ! réessayer!');
        }

        let giveawayDuration = args[1];
        if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
            return message.lineReplyNoMention(':boom: Hm. vous n\'avez pas fourni de durée. Peux-tu réessayer?');
        }

        let giveawayNumberWinners = args[2];
        if (isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
            return message.lineReplyNoMention(':boom: Uh... vous n\'avez pas fourni le nombre de gagnants.');
        }

        let giveawayPrize = args.slice(3).join(' ');
        if (!giveawayPrize) {
            return message.lineReplyNoMention(':boom: Oh, il semble que vous ne m\'avez pas donné de prix valide!');
        }
        if (!config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            giveawayChannel.send(`<@&${config["Giveaway_Options"].giveawayRoleID}>`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY FINI** :tada:",
                    timeRemaining: "temps restant: **{duration}**!",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
                    winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créer par : {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Fini à",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {

            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `<@&${config["Giveaway_Options"].giveawayRoleID}>\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "temps restant: **{duration}**!",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
                    winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créer par : {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Fini à",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (!config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            giveawayChannel.send(`@everyone`).then((msg) => msg.delete({ timeout: 1000 }))
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY FINI** :tada:",
                    timeRemaining: "temps restant: **{duration}**!",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
                    winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créer par : {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Fini à",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });

        } else if (config["Giveaway_Options"].showMention && !config["Giveaway_Options"].giveawayRoleID && config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: (config["Giveaway_Options"].showMention ? `@everyone\n\n` : "") + ":tada: **GIVEAWAY ENDED** :tada:",
                    timeRemaining: "temps restant: **{duration}**!",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
                    winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créer par : {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Fini à",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
        } else if (!config["Giveaway_Options"].giveawayMention) {
            client.giveawaysManager.start(giveawayChannel, {
                time: ms(giveawayDuration),
                prize: giveawayPrize,
                winnerCount: parseInt(giveawayNumberWinners),
                hostedBy: config["Giveaway_Options"].hostedBy ? message.author : null,
                messages: {
                    giveaway: ":tada: **GIVEAWAY** :tada:",
                    giveawayEnded: ":tada: **GIVEAWAY FINI** :tada:",
                    timeRemaining: "temps restant: **{duration}**!",
                    inviteToParticipate: "Réagissez avec 🎉 pour participer!",
                    winMessage: "Toutes nos félicitations, {winners}! Tu as gagné **{prize}**!",
                    embedFooter: "Giveaways",
                    noWinner: "Pas assez de participants pour déterminer un gagnant!",
                    hostedBy: "Créer par : {user}",
                    winners: "Gagnant(s)",
                    endedAt: "Fini à",
                    units: {
                        seconds: "secondes",
                        minutes: "minutes",
                        hours: "heures",
                        days: "jours",
                        pluralS: false
                    }
                }
            });
        }


        message.channel.send(`<a:oui:873277851695206401> Fait ! Le giveaways pour le \`${giveawayPrize}\` commence dans ${giveawayChannel}!`);
    }
}
