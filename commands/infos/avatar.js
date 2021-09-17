const Discord = require('discord.js');
module.exports = {
    name: 'avatar',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}avatar @membre',

async execute(client, message, args) {
        let member;
        if (args.length) {
            member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        } else {
            member = message.member
        }
        if (!member) {

            const embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setDescription(`You must mention a valid member or provide a valid ID.`)
            message.channel.send(embed)
        }
        const embed = new Discord.MessageEmbed()

            .setTitle(`Avatar of ${member.user.tag}`)

            .setColor("BLUE")
            .setImage(url = member.user.displayAvatarURL({ dynamic: true, size: 512 }))


        message.channel.send(embed)

        


    }
}
 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    