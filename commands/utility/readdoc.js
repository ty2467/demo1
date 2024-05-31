const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('read_doc_txt')
		.setDescription('Read user-uploaded txt file')
        .addAttachmentOption(option =>
            option.setName('file')
                .setDescription('The txt file to read')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();
        const file = interaction.options.getAttachment('file');
        
        if (file && file.url) {
            try {
                const response = await fetch(file.url);
                const text = await response.text();
                const short = text.substring(0, 100)
                console.log(short);

                await interaction.editReply(`File content preview: ${short}`);
            } catch (error) {
                console.error(error);
                await interaction.editReply('Failed to read the file.');
            }
        } else {
            await interaction.editReply('No file uploaded or invalid file.');
        }
	},
};
