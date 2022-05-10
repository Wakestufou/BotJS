module.exports = {
    help: {
        name: "ping",
        description: "Ping bot"
    },
    async execute(message, args) {
        await message.reply("Pong !");
    }
};