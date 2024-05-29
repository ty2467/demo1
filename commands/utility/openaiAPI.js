const { SlashCommandBuilder } = require('discord.js');
const { axios } = require ('axios');


async function callOpenAI(text) {
    const apiKey = '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';
    const url = 'https://api.openai.com/v1/chat/completions'; 

    try {
        const response = await axios.post(url, {
            messages: [
                {
                    role: 'system',
                    content: text,
                },
            ],
            model: 'gpt-4', 
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        
        return response.data.choices[0].message.content.trim(); 
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

        const text = 'efficient sorting algorithms'
        
        const response = await callOpenAI(text);
        await interaction.reply(response);
      
	},
};