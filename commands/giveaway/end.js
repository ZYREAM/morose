require('discord-reply');

module.exports = {
        name: "end",
        utilisation: "{prefix}end <id giveaway>",
        category: "Giveaway",
        async execute(client, message, args) {

        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.lineReplyNoMention(':boom: Vous devez avoir la permissions \`MANAGE_MESSAGES\` pour mettre fin aux giveaways.');
        }

        if (!args[0]) {
            return message.lineReplyNoMention(':boom: Oh oh, je n\'ai pas trouvé ce message ! Réessayer!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.lineReplyNoMention(':boom: Hum. Je n\'arrive pas à trouver de giveaways pour `' + args.join(' ') + '`.');
        }
        client.giveawaysManager.edit(giveaway.messageID, {
            setEndTimestamp: Date.now()
        })
            .then(() => {
                message.lineReplyNoMention('Le giveaways se terminera dans moins de ' + (client.giveawaysManager.options.updateCountdownEvery / 1000) + ' secondes...');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaways avec ID de message ${giveaway.messageID} est déjà terminé.`)) {

                    message.lineReplyNoMention('Ce giveaways est déjà terminé!');

                } else {
                    console.error(e);
                    message.lineReplyNoMention('Une erreur s\'est produite...');
                }
            });
    },
}
