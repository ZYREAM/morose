
const ms = require("ms");

colors = require('colors'),
readline = require('readline');
module.exports = async (client) => {
    console.log(`Logged in as ${client.user.username}. Ready on ${client.guilds.cache.size} servers, for a total of ${client.users.cache.size} users`);

    client.user.setActivity(client.config.discord.activity);
    
    console.clear()
console.log(`                                                                                                                     

_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|                                                                                               

                         `.red + ` Le bot `.white + `dev par kaneki`.green + ` est ` + `maintenant connecter`.blue + `                       
                   ___________________________________________________`.red)
};