	Discord = require("discord.js");
	require('discord-reply');
	module.exports = {
		name: 'servliste',
		aliases: ['sl'],
		category: 'Infos',
		utilisation: '{prefix}servliste',
	async execute(client, message, args) {
        
		await message.delete();

		let i0 = 0;
		let i1 = 10;
		let page = 1;

		let description = 
        `${("SERVERS")}: ${client.guilds.cache.size}\n\n`+
		client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${("MEMBERS").toLowerCase()}`)
			.slice(0, 10)
			.join("\n");
		const embed = new Discord.MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setColor("#9b9b9b")
			.setFooter(client.user.username)
			.setTitle(`${("PAGE")}: ${page}/${Math.ceil(client.guilds.cache.size/10)}`)
			.setDescription(description);

		const zerwyx = await message.lineReplyNoMention(embed);
        
		await zerwyx.react("⬅");
		await zerwyx.react("➡");
		await zerwyx.react("❌");

		const collector = zerwyx.createReactionCollector((reaction, user) => user.id === message.author.id);

		collector.on("collect", async(reaction) => {
			if(reaction._emoji.name === "⬅") {

				i0 = i0-10;
				i1 = i1-10;
				page = page-1;
                
				if(i0 < 0){
					return zerwyx.delete();
				}
				if(!i0 || !i1){
				}
                
				description = `${("SERVERS")}: ${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${("MEMBERS")}`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`${("PAGE")}: ${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				zerwyx.edit(embed);
            
			}

			if(reaction._emoji.name === "➡"){

				i0 = i0+10;
				i1 = i1+10;
				page = page+1;

				if(i1 > client.guilds.cache.size + 10){
					return zerwyx.delete();
				}
				if(!i0 || !i1){
					return zerwyx.delete();
				}

				description = `${("SERVERS")}: ${client.guilds.cache.size}\n\n`+
				client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
					.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} ${("MEMBERS").toLowerCase()}`)
					.slice(i0, i1)
					.join("\n");

				embed.setTitle(`${("PAGE")}: ${page}/${Math.round(client.guilds.cache.size/10)}`)
					.setDescription(description);
            
				zerwyx.edit(embed);

			}

			if(reaction._emoji.name === "❌"){
				return zerwyx.delete(); 
			}

			await reaction.users.remove(message.author.id);

		});
	}
	};
