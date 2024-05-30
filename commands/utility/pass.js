const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pass')
		.setDescription('pass in command toy'),
	async execute(interaction) {
        pong = 'Pong!'
		// await interaction.reply('Pong!');
        await interaction.reply(pong)
	},
};
