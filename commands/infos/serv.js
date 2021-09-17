const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const { stripIndents } = require("common-tags");
const moment = require('moment')
const ms = require('pretty-ms');
require('discord-reply');
module.exports = {
    name: 'botinfo',
    aliases: ['bt', 'bot'],
    category: 'Infos',
    utilisation: '{prefix}serv',
async execute(client, message, args) {

    message.lineReplyNoMention(new Discord.MessageEmbed()
            .setColor('#9b9b9b')
            .setDescription(`
            Voici les informations sur DEV BOT
                    🆔\`Nom d'utilisateur\` : **${message.client.user}**
                    👤\`Créé le\` : **${moment(message.client.user.createdTimestamp).locale('fr').format('LT ,')} ${moment(message.client.user.createdTimestamp).locale('fr').format('LL, ')} ${moment(message.client.user.createdTimestamp).locale('fr').fromNow()}**
                    ⏺\`Bot certifié ?\` : **Non**`)
            .addField(`🔢 __Statistiques :__`, `
                    🖥 \`Serveurs\` : **${message.client.guilds.cache.size}**
                    👨‍👩‍👦\`Utilisateur\` : **${message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}**
                    🧾\`Commandes\` : **...**
                    🆚\`Version\` : **3**`, true)
            .addField(`🤖 __Informations :__`, `
                    📉\`Language\` : **Discord.js**
                    👨🏼‍💻\`Developpeur\` : **\@! kaneki**
                    💾\`Database\` : **MongoDB**
                    🖥\`Hebergeur\` : <:adkynet:838737912106319872> [\`AdKyNet\`](https://www.adkynet.com)`, true)
            .addFields({
                name: "Liens utliles", value: `
                    [Inviter le bot](https://discord.com/api/oauth2/authorize?client_id=866688388723114015&permissions=8&scope=bot) - [Support](https://discord.gg/YuvmAdug4h)` })
        );
    }
}
