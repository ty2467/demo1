const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
	},
};

//1. write the command in a separate file
//2. add code into main.js file that accesses the command, and code that calls the command upon user slashcommand interaction event.
//3. register the command with discord

//note: if i don't register the command, it does not show with discord user 