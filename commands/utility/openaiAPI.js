const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');


async function callOpenAI() {
    const url = 'https://api.openai.com/v1/chat/completions'
    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer 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",
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