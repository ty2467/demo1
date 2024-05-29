require("dotenv").config()
// const Discord = require("discord.js")
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
console.log(process.env.DISCORD_TOKEN)
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent]})
client.on("ready", () => { console.log('Logged in as ${client.user.tag}!')})


/**
 * Setting up commands handler
 */
const fs = require('node:fs');
const path = require('node:path');
client.commands = new Collection();

const foldersPath = path.join(__dirname, 'commands'); //cur_dir/commands
const commandFolders = fs.readdirSync(foldersPath); 

    //load commands from files within a commands subdirectory into a clients.command collection. 

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder); 
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath); 
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);  //key: command name, value: the command
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}

/**
 * Handles user sending in slash command, an interaction event. 
 *  (interactionsCreate is an event)
 */
client.on(Events.InteractionCreate, async interaction => { 
	if (!interaction.isChatInputCommand()) return; //this line chekcs if the interaction from the user is a chat input command.
	console.log(interaction);

    const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);  //all the bot.js does is execute
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

//we see the interaction object here, which is also in ping.js
//this interaction object is passed into the execute function command. execute is a method of this command object, which is
//itself obtained through the commandName of the interactions object




//messageCreate is an event
client.on("messageCreate", msg => { 
    
    // if (msg.content === "ping") { msg.reply("pong");}
    if (!msg.author.bot) {
        /**
         * spits out the message sent. 
         * works with:
         *  text
         *  emojis
         */
        the_content = msg.content //this saves more overhead ;; anything from bot is ignored
        msg.reply(the_content) 

        /* 
            visit websites 
                use: /website command
        */
        

        /*
            pull up chat gpt
                use: /gpt command

        */


        /*
            control flow on many users (i have no idea what he wants here)
            
        */

        /**
         * Read documents. Maybe employ chat-gpt for this?
         * 
         */
    }
    
})
client.login(process.env.DISCORD_TOKEN);