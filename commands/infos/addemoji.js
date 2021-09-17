const Discord = require('discord.js');

module.exports = {
        name: 'addemoji',
        category: 'Infos',
async execute(message, args) {
    const emoji = args[0];
        if (emoji) {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Veuillez me donnez un emoji à ajouter`)
    message.channel.send(embed)
    }
    let customemoji = Discord.Util.parseEmoji(emoji);
        if (customemoji) {
    const Link = `https://cdn.discordapp.com/emojis/${customemoji.id}.${customemoji.animated ? "gif" : "png"
         }`;
    const name = args.slice(1).join(" ");
        try {
        await message.guild.emojis.create(
            `${Link}`,
            `${name || `${customemoji.name}`}`
            ).then(emoji => {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`${emoji} l'emoji a bien été jouté au serveur`)
    message.channel.send(embed)
        })
    } catch (err) {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Une erreur est survenue!\n\n**Raisons possibles:**\n\`\`\`- Ce serveur a atteint la limite d'émojis\n- Le bot n'a pas d'autorisations.\n- La taille des emojis est trop grande.\n- Il n'y a pas d'emojis séléctionné\`\`\``)
    message.channel.send(embed)
        }
    } else {
    let CheckEmoji = parse(emoji, { assetType: "png" });
        if (CheckEmoji[0]) {
    const embed = new Discord.MessageEmbed()
        .setColor("RED")
        .setDescription(`Veuillez me donnez un emoji à ajouter`)
        .setDescription(`Vous pouvez utiliser des emoji normaux sans ajouter de serveur!`)
    message.channel.send(embed)
            }
            
        }
    }
}