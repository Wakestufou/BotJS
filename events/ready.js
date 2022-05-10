const Loggers = require('../utils/Loggers');

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		const Guilds = client.guilds.cache.map(guild => guild);
		Loggers.info(`Ready! Logged in as ${client.user.tag}`);

		client.user.setPresence({
			status: 'online'
		});
		
		client.user.setActivity(global.env.prefix + 'help', {
			type: "LISTENING"
		});
	},
};