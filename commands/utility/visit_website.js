const { SlashCommandBuilder } = require('discord.js');
const cheerio = require('cheerio');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('visit_website')
		.setDescription('visits website'),
	async execute(interaction) {
        /**
         * the below code works
         */
        try{
            const response = await fetch('https://www.gnu.org/home.en.html');
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
        /**
         * the working code ends here
         */
    },
        
};