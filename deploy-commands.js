const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json'); //using .env instead of .config
const fs = require('node:fs');
const path = require('node:path');

const commands = [];
// Grab all the command folders from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);
console.log(commandFolders)

for (const folder of commandFolders) {
	// Grab all the command files from the commands directory you created earlier
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
        console.log(command)
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		}
	}
}


// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);
// const rest = new REST().setToken('MTIzNjQ5NDU4NjQ4Mjc5MDU2NA.GumTx2.6kJDFMSm0a6hEu6AGLhdlLSIH3OuS2qTp2oBVc');



// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
            // Routes.applicationGuildCommands('1236494586482790564', '1243943675491389552'),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
        console.log("got to here?")
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
