const Discord = module.require('discord.js');
const { MessageEmbed } = require('discord.js');
const genbot = "#cc00ff";
require('discord-reply');
module.exports = {
  name: 'userinfo',
  aliases: ["ui"],
  category: 'Infos',
  utilisation: '{prefix}userinfo',
  execute(client, message) {
  let memberInfo = message.mentions.members.first();
  if(!memberInfo){
    var userinf = new MessageEmbed()
        .setAuthor(message.author.username)
        .setThumbnail(message.author.avatarURL)
        .setDescription("This is the user's info!")
        .setColor('#9b9b9b')
        .addField("Full Username:", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID:", message.author.id)
        .addField("Created At:", message.author.createdAt)

        message.lineReplyNoMention(userinf);

  }else{
    var userinfoo = new MessageEmbed()
        .setAuthor(memberInfo.displayName)
        .setThumbnail(memberInfo.user.avatarURL)
        .setDescription("This is the user's info!")
        .setColor('#9b9b9b')
        .addField("Full Username:", `${memberInfo.user.username}#${memberInfo.user.discriminator}`)
        .addField("ID:", memberInfo.id)
        .addField("Created At:", memberInfo.user.createdAt)

        message.lineReplyNoMention(userinfoo);
  }
}

}