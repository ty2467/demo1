const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pass')
		.setDescription('pass in command toy')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('The message to echo')
                .setRequired(true)),
	async execute(interaction) {
        let message = interaction.options.getString('message');
        console.log(message);
        await interaction.reply(message);
	},
};
