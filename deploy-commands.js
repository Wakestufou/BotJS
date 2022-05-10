const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const process = require('process');
const Logger = require("./utils/Loggers");

module.exports = {
    async execute() {
        Logger.info("Enregistrements des (/) commands a envoyer...");
        global.dev = process.argv.includes('--DEV');

        const commands = [];
        const commandFiles = fs.readdirSync('./commands/slashcommands').filter(file => file.endsWith('.js'));
        
        for (const file of commandFiles) {
            const command = require(`./commands/slashcommands/${file}`);
            commands.push(command.help.toJSON());
            Logger.info("Enregistrement de la (/) command : " + command.help.name);
        }
        
        const rest = new REST({ version: '9' }).setToken(global.env.DICORD_TOKEN);
        
        (async () => {
            try {
                Logger.info("Started refreshing application (/) commands.");
        
                if(global.dev) {
                    await rest.put(
                        Routes.applicationGuildCommands(global.env.APPLICATION_ID, global.env.GUILD_DEV),
                        { body: commands },
                    );
                }
                else {
                    await rest.put(
                        Routes.applicationCommands(global.env.APPLICATION_ID),
                        { body: commands },
                    );
                }
                
        
                Logger.info("Successfully reloaded application (/) commands.");
            } catch (error) {
                Logger.error("Erreur lors de l'envoie des (/) commands", error);
            }
        })();
    }
}