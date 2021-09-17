 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|                                                                                           



const fs = require('fs');
const discord = require('discord.js');
const client = new discord.Client({ disableMentions: 'everyone' });
client.config = require('./config/bot');
client.emotes = client.config.emojis;
client.utilisateurs = client.config.serv;
client.serveur = client.config.serveur;
client.commands = new discord.Collection();
client.snipes = new discord.Collection();
const { Client, MessageAttachment, Collection, MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const bot = new Discord.Client();
const db = require('quick.db');
const { GiveawaysManager } = require("discord-giveaways");
const yaml = require("js-yaml");
const { botlog } = yaml.load(fs.readFileSync("./config.yml"));
client.db = db;

const Enmap = require("enmap");
const chalk = require("chalk");
fs.readdirSync('./commands').forEach(dirs => {
    const commands = fs.readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));
    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        console.log(chalk.green(`${file} charger avec succes [COMMAND]`));
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of events) {
    console.log(chalk.yellow(`${file} charger avec succes [EVENT]`));
    const event = require(`./events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};


///////GIVEAWAYS/////////

client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`Giveaway #${giveaway.messageID} ended! Winners: ${winners.map((member) => member.user.username).join(', ')}`);
});

const fetch = require("node-fetch")


client.on('ready', () => {

    const statuses = [
        () => `+help | ${client.guilds.cache.size} Servers`,
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), { type: 'STREAMING', url : "https://www.twitch.tv/discord"} )
        i = ++i % statuses.length
    }, 1e4)
})

///snipe///
const prefix = client.config.discord.prefix
var accents = require('remove-accents');
 
console.log(accents.remove('ÀÁÂÃÄÅ')); // AAAAAA

client.snipes = new Map()
client.on('messageDelete', function(message, channel){
  
  client.snipes.set(message.channel.id, {
    content:message.content,
    author:message.author,
    image:message.attachments.first() ? message.attachments.first().proxyURL : null
  })
  
})



client.on("message", async message => {
    
        if (message.content.startsWith(prefix + "snipe")) {
  const msg = client.snipes.get(message.channel.id)
  const embedd = new Discord.MessageEmbed()
  .setColor("BLUE")
  .setDescription("Error | Il n'y a rien à sniper !")
    if(!msg) return message.channel.send(embedd)
    const embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.username , msg.author.displayAvatarURL({dynamic : true }))
    .setDescription(msg.content)
    .setColor("BLUE")
    .setTimestamp() 
    if(msg.image)embed.setImage(msg.image)
    
    message.channel.send(embed)
}})

client.login(client.config.discord.token);

