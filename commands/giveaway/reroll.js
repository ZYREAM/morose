const ms = require('ms');
const config = require("../../config.json")
require('discord-reply');
module.exports = {
        name: "reroll",
        utilisation: "{prefix}reroll <id giveaway>",
        category: "Giveaway",
        async execute(client, message, args) {
        if (!message.member.hasPermission('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return message.lineReplyNoMention(':boom: Vous devez avoir la permission \`MANAGE_MESSAGES\`  pour reroll giveaways.');
        }

        if (!args[0]) {
            return message.lineReplyNoMention(':boom: Uh oh, Je n\'ai pas trouvé ce message ! réessayer!');
        }

        let giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
            client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

        if (!giveaway) {
            return message.lineReplyNoMention(':boom: Hm. Je n\'arrive pas à trouver de cadeau pour `' + args.join(' ') + '`.');
        }

        client.giveawaysManager.reroll(giveaway.messageID)
            .then(() => {
                message.lineReplyNoMention('Giveaway rerolled!');
            })
            .catch((e) => {
                if (e.startsWith(`Giveaway avec l'identifiant du message ${giveaway.messageID} n'a pas fini.`)) {
                    message.lineReplyNoMention('This giveaway n\'a pas fini!');
                } else {
                    console.error(e);
                    message.lineReplyNoMention('Une erreur s\'est produite...');
                }
            });
    },
}

