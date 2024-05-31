const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();


async function callOpenAI(prompt) {
    const url = 'https://api.openai.com/v1/chat/completions'
    apiKey = process.env.OPENAI_API_KEY;
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
    };

    console.log(prompt)


    
    try {
        const response = await axios.post(url, {
            model: "gpt-3.5-turbo",
            
            messages: [{ role: "user", content: prompt }],
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
		.setDescription('calls gpt-3.5-turbo for chat completion')
        .addStringOption(option =>
            option.setName('your_message')
                .setDescription('The message to be sent to chatgpt')
                .setRequired(true)),
	async execute(interaction) {
        await interaction.deferReply();

        const prompt = interaction.options.getString('your_message');
        const response = await callOpenAI(prompt);

        if (response && response.choices && response.choices.length > 0) {
            const messageContent = response.choices[0].message.content;
            await interaction.editReply(messageContent);
        } else {
            console.log('No valid response from OpenAI API');
            await interaction.editReply('No valid response from OpenAI API');
        }

	},
};