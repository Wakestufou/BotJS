const { Permissions, MessageEmbed, DMChannel } = require('discord.js');
const fs = require('fs');
const Loggers = require('../utils/Loggers');


module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (message.channel instanceof DMChannel) {
            Loggers.info(`${message.content}`, `DM Message of ${message.author.username} (${message.author.id})`);
            return;
        }
    
        let prefix = global.env.PREFIX;
        let messageArray = message.content.split(' ');
        let commandName = messageArray[0].substring(prefix.length);
        let prefixVerif = prefix === messageArray[0].substring(0, prefix.length);
        let args = messageArray.slice(1);

        let command = message.client.commands.get("simplecommands").get(commandName);        
        
        if (!command || !prefixVerif) return;

        try {
            if (command.help.admin) {
                if (!message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) || json.god.split(',').indexOf(message.author.id)) {
                    await message.reply("Tu ne peux pas faire ça !");
                }
                else {
                    await command.execute(message, args);
                }
            }
            else {
                await command.execute(message, args);
            }
        }
        catch(e) {
            Loggers.error("Une erreur est survenue lors de l'execution de la command : " + commandName, e);
        }
	},
};