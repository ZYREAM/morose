const { Message } = require('discord.js')

module.exports = {
    name : 'removerole',
    category: 'Moderation',
    async execute(client, message, args)  {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send('Tu ne possèdes pas les permissions. :christmas_tree:')
        const target = message.mentions.members.first() //member = mentions
        if(!target) return message.channel.send('Il faut que tu spécifies un membre !🎄')
        const role = message.mentions.roles.first() // roles = mentions
        if(!role) return message.channel.send('Il faut que tu spécifies un membre ! 🎄')
        await target.roles.remove(role)
        message.channel.send(`${target.user.username}  j'ai retiré se rôle ! 🎄`) //
    }
} 
//_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
//_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
//_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
//_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
//_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
//_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    