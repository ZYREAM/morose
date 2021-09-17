require('discord-reply');

module.exports = {
    name: 'embed',
    aliases: ['eb'],
    category: 'Administration',
    utilisation: ' ',
async execute(client, message, args) {
    const Discord = require('discord.js')
    const ms = require('ms')
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.lineReplyNoMention("<a:non:873277850520813618> Vous n'avez pas la permission d'utiliser la commande, la permission requise est `MANAGE_MESSAGES`.")
        const embed = new Discord.MessageEmbed().setDescription('.')
        let msgembed = await message.lineReplyNoMention(embed)
        let msg = await message.lineReplyNoMention("Voici le menu de création d'embed de "+client.user.username+"\n✏️ Modifier le **Titre**\n💬 Modifier la **Description**\n🕵️ Modifier l'**Auteur**\n🔻 Modifier le **Footer**\n🔳 Modifier le **Thumbnail**\n🖼️ Modifier l'**Image**\n🌐 Modifier l'**URL**\n🔵 Modifier la **Couleur**\n⏱ Ajouter un **Timestamp**\n✅ Envoyer l'**Embed**\n❌ Annuler la création de l'**Embed**")
        
        await msg.react('✏️')
        await fast(250);
        await msg.react('💬')
        await fast(250);
        await msg.react('🕵️')
        await fast(250);
        await msg.react('🔻')
        await fast(250);
        await msg.react('🔳')
        await fast(250);
        await msg.react('🖼️')
        await fast(250);
        await msg.react('🌐')
        await fast(250);
        await msg.react('🔵')
        await fast(250);
        await msg.react('⏱️')
        await fast(250);
        await msg.react('✅')
            function fast(ms) {
                        return new Promise((resolve) => {
                          setTimeout(resolve, ms);
                        });
                      }
        await msg.react('❌').then(async (m) => {

        
            let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
            collector.on("collect", async (reaction, user) => {
                if (reaction._emoji.name === "✏️") {
                    let question = await message.channel.send("Quel **Titre** voulez-vous attribuez à l'embed ?",)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        updateEmbed()
                        function updateEmbed() {
                    embed.setTitle(collected.first().content)
                    msgembed.edit(embed)
                }
            })
        }
                
                if (reaction._emoji.name === "💬") {
                    let question = await message.channel.send("Quel **Description** voulez-vous attribuez à l'embed ?",)
                    const filter = m => message.author.id === m.author.id;
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected) => {
                        collected.first().delete()
                        question.delete()
                        updateEmbed()
                        function updateEmbed() {
                    embed.setDescription(collected.first().content)
                    msgembed.edit(embed)
                }
            })
        }
                if (reaction._emoji.name === "🕵️") {
                    let question = await message.channel.send("Quel **Auteur** voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let question2 = await message.channel.send("Quel **Image d'Auteur** voulez-vous attribuez à l'embed")
    
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected2) => {
                        collected2.first().delete()
                        question2.delete()
                        .then(async () => {
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send("Je n'ai pas pu ajouter une **Image d'Auteur**, le lien de l'image est invalide.").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                        //if (!collected2.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setAuthor(collected.first().content, collected2.first().content)
                msgembed.edit(embed)
            }
            });
        })
    }
            if (reaction._emoji.name === "🔻") {
                let question = await message.channel.send("Quel **Footer** voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    let question2 = await message.channel.send("Quel **Image de Footer** voulez-vous attribuez à l'embed")
    
                    message.channel.awaitMessages(filter, {
                        max: 1,
                        time: 60000,
                        errors: ['time']
                    }).then(async (collected2) => {
                        collected2.first().delete()
                        question2.delete()
                        .then(async () => {
                        }).catch(async (err) => {
                            console.log(err)
                            collected.first().delete()
                            message.channel.send("Je n'ai pas pu ajouter une **Image de Footer**, le lien de l'image est invalide.").then((mm) => mm.delete({
                                timeout: 5000
                            }));
                        })
                        //if (!collected2.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setFooter(collected.first().content, collected2.first().content)
                msgembed.edit(embed)
            }
        });
    })
}
            if (reaction._emoji.name === "🔳") {
                let question = await message.channel.send("Quel **Thumbnail** voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Je n'ai pas pu ajouter un **Thumbnail**, le lien de l'image est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    //if (!collected.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setThumbnail(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "🖼️") {
                let question = await message.channel.send("Quel **Image** voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Je n'ai pas pu ajouter une **Image**, le lien de l'image est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    //if (!collected.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setImage(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "🌐") {
                let question = await message.channel.send("Quel **URL** voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Je n'ai pas pu ajouter une **URL**, l'URL est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    //if (!collected.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setURL(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "🔵") {
                let question = await message.channel.send("Quel **Couleur** (exemple : `#ff0000` pour le rouge ou `#313131` pour la transparence) voulez-vous attribuez à l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    .then(async () => {
                    }).catch(async (err) => {
                        console.log(err)
                        collected.first().delete()
                        message.channel.send("Je n'ai pas pu ajouter une **Couleur**, le format de la couleur est invalide.").then((mm) => mm.delete({
                            timeout: 5000
                        }));
                    })
                    //if (!collected.startsWith('https://')) return message.channel.send('❌ `REFUS` Vous n\'avez pas mis un lien mais un message ou une pièce jointe !')
                    updateEmbed()
                    function updateEmbed() {
                embed.setColor(collected.first().content)
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "⏱") {
                let question = await message.channel.send("Quel **Timestamp** voulez-vous attribuez à l'embed ? Veuillez marquer `oui` si vous voulez qu'un timestamp de l'heure actuelle soit ajouté. Tapez `cancel` pour annuler.",)
                
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    if(collected.first() === 'cancel') return;
                    if(collected.first() === 'today') return updateEmbed()
                    function updateEmbed() {
                embed.setTimestamp()
                msgembed.edit(embed)
            }
        })
    }
            if (reaction._emoji.name === "✅") {
                let question = await message.channel.send("Dans quel **Salon** (ID du Salon exemple : `821484589473595473`) voulez-vous envoyez l'embed ?",)
                const filter = m => message.author.id === m.author.id;
                message.channel.awaitMessages(filter, {
                    max: 1,
                    time: 60000,
                    errors: ['time']
                }).then(async (collected) => {
                    collected.first().delete()
                    question.delete()
                    const embedchannel = message.guild.channels.cache.get(collected.first().content) || collected.first().mentions.channels.first()
                    if (!embedchannel) return message.channel.send('Veuillez mentionner un salon')
                    embedchannel.send(embed)
            })
        }
    
    
        
                if (reaction._emoji.name === "❌") {
                    msg.delete()
                }
                await reaction.users.remove(message.author.id);
            })
        })
    }} 
    //_|_|_|_|   _|         _|      _|        _|      _|    _|_|_|_|_|    _|_|_|_|_|    _|_|_|_|_|_|_|
    //_|         _|           _|  _|          _|      _|    _|      _|    _|      _|          _|
    //_|_|_|_|   _|             _|            _|      _|    _|      _|    _|_|_|_|_|          _|
    //_|         _|             _|            _|_|_|_|_|    _|_|_|_|_|    _|  _|              _|  
    //_|         _|             _|            _|      _|    _|      _|    _|    _|            _|
    //_|         _|_|_|_|       _|            _|      _|    _|      _|    _|      _|          _|    