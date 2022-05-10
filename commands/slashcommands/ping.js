const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    help: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Ping bot"),
    async execute(interaction) {
        await interaction.reply('Pong !');
    }
};