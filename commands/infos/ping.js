
require('discord-reply');
module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Infos',
    utilisation: '{prefix}ping',

    execute(client, message) {
        message.lineReplyNoMention(`${client.emotes.success} - Ping : **${client.ws.ping}ms**`);
    },
};