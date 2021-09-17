const discord = require('discord.js'); //Define the discord.js module
const client = new discord.Client(); //Creating discord.js client (constructor)
const fetch = require('node-fetch')
const disbut = require('discord-buttons');
const { MessageButton, MessageActionRow } = require("discord-buttons")
disbut(client);
require('discord-reply');

const { stripIndents } = require("common-tags");
const moment = require('moment')
const ms = require('pretty-ms');
module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'Core',
    utilisation: '{prefix}help <nom de la commande>',

  async  execute(client, message, args) {
        if (!args[0]) {
            const moderation = message.client.commands.filter(x => x.category == 'Moderation').map((x) => '`' + x.name + '`').join(', ');
            const giveaway = message.client.commands.filter(x => x.category == 'Giveaway').map((x) => '`' + x.name + '`').join(', ');
            const backup = message.client.commands.filter(x => x.category == 'Backup').map((x) => '`' + x.name + '`').join(', ');
            const administration = message.client.commands.filter(x => x.category == 'Administration').map((x) => '`' + x.name + '`').join(', ');
            const configuration = message.client.commands.filter(x => x.category == 'Configuration').map((x) => '`' + x.name + '`').join(', ')
            const infos = message.client.commands.filter(x => x.category == 'Infos').map((x) => '`' + x.name + '`').join(', ')
            
            
            const UserEmbed = new discord.MessageEmbed()
            .setColor(`#9b9b9b`)
            .setTitle(`Commande d'aide`)
            .setFooter(`bot`)
            .setDescription('```Page Help du bot \nPrefix : +```')
            .addField('<:giveaway:873275834281103430> Giveaway',giveaway)
            .addField('<:moderation:873277256301178950> Moderation',moderation)
            .addField('<:configuration:873275834495041587> Configuration',configuration)
            .addField('<:backup:873275835367436368> Backup',backup)
            .addField('<:settings:877893603106631720> Administration',administration)
            .addField('<:settings:877893603106631720> Infos',infos)
            .setTimestamp(new Date())
                
            const msg = await message.channel.send({
                embed: UserEmbed
            })

            await msg.react("<a:gauche:873526843632922634>")
            const filterReaction = (reaction, user) => user.id===message.author.id&&!user.bot;
            const collectorReaction = await new discord.ReactionCollector(msg, filterReaction);
            collectorReaction.on('collect', async reaction => {
                switch(reaction.emoji.id){
                    case "873526843632922634":
                        msg.edit(UserEmbed)
                  break;
                }
            reaction.users.remove(message.author.id);
        })
        
        await msg.react("<:infos:873866943126442004>")
            collectorReaction.on('collect', async reaction => {
                switch(reaction.emoji.id){
                    case "873866943126442004":
                        const embed1 = new discord.MessageEmbed()
                        .setColor(`#9b9b9b`)
                        .setTitle(`Commande d'aide`)
                        .setFooter(`bot`)
                        .setDescription('```Crow Bot | +help```')
                        .addField('<:developpeur:873869401311571988> Developpeur :', `!"kaneki™#0013`)
                        .addField('<:serveur:873870034110402590> Serveurs :',`${message.client.guilds.cache.size}`)
                        .addField('<:utilisateur:873870047783821314> Utilisateur :',`${message.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`)
                        .addField('<:creation:873870032269115412> Créé le :', `${moment(message.client.user.createdTimestamp).locale('fr').format('LT ,')} ${moment(message.client.user.createdTimestamp).locale('fr').format('LL, ')} ${moment(message.client.user.createdTimestamp).locale('fr').fromNow()}`)
                        .setTimestamp(new Date())
                        msg.edit(embed1)
                  break;
                }
            reaction.users.remove(message.author.id);
        })


        } else {
            const command = message.client.commands.get(args.join(" ").toLowerCase()) || message.client.commands.find(x => x.aliases && x.aliases.includes(args.join(" ").toLowerCase()));

            if (!command) return message.lineReplyNoMention(`${client.emotes.error} - La commande est introuvable`);

            message.lineReplyNoMention({
                embed: {
                    color: '#9b9b9b',
                    author: { name: 'Commande help' },
                    footer: { text: `${client.config.discord.inf}` },
                    fields: [
                        { name: 'Nom', value: command.name, inline: true },
                        { name: 'Catégories', value: command.category, inline: true },
                        { name: 'Aliase(s)', value: command.aliases.length < 1 ? 'None' : command.aliases.join(', '), inline: true },
                        { name: 'Utilisation', value: command.utilisation.replace('{prefix}', client.config.discord.prefix), inline: true },
                    ],
                }
            });
        };
    },
}; 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    