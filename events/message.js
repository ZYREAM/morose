module.exports = (client, message) => {
  const Discord = require("discord.js");
const Enmap = require("enmap");
const srv = new Enmap({name: "serveur"}); 

const LIMIT = 5;
const TIME = 30000;
const DIFF = 3000;  
if (message.author.bot) return;
if (message.channel.type === 'dm') return;

const prefix = client.config.discord.prefix; //chemin vers votre prefix de base
const db = require('quick.db');
const { MessageEmbed } = require('discord.js');
//module

//code


      

const droit = "<a:uncheckmoove:740634696198914070> **You are not allowed to do this!**";
srv.ensure(`${message.guild.id}`, {
    guild: message.guild.id,
    rolemute: "none",
    catticket: "none",
    statimgwelc: "off",
    imgwelcchannel: "none",
    statimgleave : "off",
    imgleavechannel : "none",
    statwelc : "off",
    welcchannel : "none",
    statleave : "off",
    leavechannel : "none",
    autorole : "none",
    statautorole : "off",
    suggchannel: "none",
    statbadword: "off",
    statspam: "off",
    statreact: "off",
    logschannel: "none",
    statlogs: "off",
    antipub: "on",
    adchannel: "none",
    reportchannel: "none",
    modlogschannel: "none",
    ticketchannel: "none",
    membercounttextall: "Totale",
    membercounttextbots: "Bots",
    membercounttextmembers: "Membres",
    membercount: "off",
    membercountchannelall: "none",
    membercountchannelbots: "none",
    membercountchannelmembers: "none",
    membercountcat: "none",
    statlvl: "on",
    ticketrolestaff: "none",
});

   ////anti pub////

   
    ////anti pub////

    ///anti spam////

    if(srv.get(`${message.guild.id}`, "antipub") === "on"){
      if(!message.member.hasPermission("MANAGE_MESSAGES")){
        if(message.channel.id !== srv.get(`${message.guild.id}`, "adchannel").id){
          if(message.content.includes('discord.gg/') || message.content.includes('discordapp.com/invite/')) {
            message.delete();
            const droit = new Discord.MessageEmbed()
                .setDescription(`<a:non:873277850520813618> Désolé mais nous n'acceptons pas la pub ici  ${message.author.username} \n \n> * Pour autoriser les pub faites la commande => ${prefix}antipub off*`);
            return message.channel.send(droit);
          }
        }
      }
  
    }
    
      const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
      if (message.content.match(prefixMention)) {
      return message.channel.send(new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL({dynamic: true, size: 512}))
  .setDescription(`❯  Mon prefix est **\`${prefix}\`**`)
  .setColor('BLACK')
  .setTimestamp()
  .setFooter(client.user.tag, client.user.displayAvatarURL({dynamic: true, size: 512}))
     )}

    ////anti pub fin////

    

    if (message.content.indexOf(prefix) !== 0) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);

    

};
 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    