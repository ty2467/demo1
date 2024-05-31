const { SlashCommandBuilder } = require('discord.js');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('visit_website_html')
		.setDescription('visits a html webpage')
        .addStringOption(option =>  
            option.setName('url')
                .setDescription('The link to  visit')
                .setRequired(true)),
        
	async execute(interaction) {
        let theurl = interaction.options.getString('url');

        try{
            const response = await fetch(theurl);
            console.log(response);
            const html = await response.text();
            const $ = cheerio.load(html);
            out = "";
            $('p').each((index, element) => {
                out += $(element).text() + "\n";
                return false
            });
                
            await interaction.reply(out);


        } catch (error){
            console.error ("Error; ", error)
        }
    },
        
};