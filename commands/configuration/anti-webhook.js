var Discord = require("discord.js");
const Enmap = require("enmap");
const srv = new Enmap({name: "serveur"}); 
require('discord-reply');  

module.exports = {
    name: 'antiweb',
    category: 'Configuration',
    utilisation: 'on/off',
    async execute(client, message, args, droit) {
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            const droit = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription("<a:non:873277850520813618> **Vous n'avez pas la permission de faire cette commande**");
            return message.lineReplyNoMention(droit);
        }
        if(!args[0]){
            const droit = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription(`<a:non:873277850520813618> **Veuillez préciser on/off.**`);
            return message.lineReplyNoMention(droit);
        }
        if(args[0] === "on"){
            srv.set(`${message.guild.id}`, "on", "antipub");
            const droit = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription("<a:oui:873277851695206401> La création de webhook est désormais interdite");
                message.lineReplyNoMention(droit);
        }else if(args[0] === "off"){
            srv.set(`${message.guild.id}`, "off", "antipub");
            const droit = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription("<a:oui:873277851695206401> La création de webhook est désormais autorisée");
                message.lineReplyNoMention(droit);
        }else {
            const droit = new Discord.MessageEmbed()
            .setColor('#9b9b9b')
                .setDescription(`<a:non:873277850520813618> **Veuillez préciser on/off.**`);
            return message.lineReplyNoMention(droit);
        }
    }} 
    //_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
    //_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
    //_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
    //_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
    //_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
    //_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    