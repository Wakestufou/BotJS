const { Collection, Client, Intents } = require('discord.js');
const fs = require('fs');
const dotenv = require('dotenv');
const Logger = require("./utils/Loggers");


dotenv.config();
global.env = process.env;

Logger.info("LANCEMENT", "Lancement du bot");

require('./deploy-commands').execute();

Logger.info("Création du client", "LANCEMENT");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] , partials: ["CHANNEL"]});


client.commands = new Collection();
client.commands.set("slashcommands", new Collection());
client.commands.set("simplecommands", new Collection());

//Enregistrement des simplecommands
Logger.info("Enregistrement des simples commands...", "LANCEMENT");
const commandFiles = fs.readdirSync('./commands/simplecommands').filter(file => file.endsWith('.js'));
commandFiles.forEach(file => {
    const command = require(`./commands/simplecommands/${file}`);
    client.commands.get("simplecommands").set(command.help.name, command);
	Logger.info("Enregistrement de la command : " + command.help.name, "LANCEMENT");
});

//Enregistrement des slashcommands
Logger.info("Enregistrement des (/) commands...", "LANCEMENT");
const commandFilesInteractions = fs.readdirSync('./commands/slashcommands').filter(file => file.endsWith('.js'));
commandFilesInteractions.forEach(file => {
    const command = require(`./commands/slashcommands/${file}`);
    client.commands.get("slashcommands").set(command.help.name, command);
	Logger.info("Enregistrement de la (/) command : " + command.help.name, "LANCEMENT");
});



Logger.info("Enregistrement des events...", "LANCEMENT");

const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(global.env.DICORD_TOKEN);