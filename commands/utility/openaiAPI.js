const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();


async function callOpenAI() {
    const url = 'https://api.openai.com/v1/chat/completions'
    apiKey = process.env.OPENAI_API_KEY;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    console.log("executed")
    
    try {
        const response = await axios.post(url, {
            model: "gpt-3.5-turbo",
            
            messages: [{ role: "user", content: "Say this is a test!" }],
            temperature: 0.7
        }, { headers });
        
        console.log(response.data)
        return response.data
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        return 'An error occurred while processing your request.';
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('openaiapi')
		.setDescription('calls gpt4 for chat completion'),
	async execute(interaction) {
        await interaction.deferReply();

        const response = await callOpenAI();

        if (response && response.choices && response.choices.length > 0) {
            const messageContent = response.choices[0].message.content;
            await interaction.editReply(messageContent);
        } else {
            console.log('No valid response from OpenAI API');
            await interaction.editReply('No valid response from OpenAI API');
        }

	},
};