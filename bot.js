require("dotenv").config()
// const Discord = require("discord.js")
const { Client, GatewayIntentBits } = require('discord.js');
console.log(process.env.DISCORD_TOKEN)
const client = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent]})
client.on("ready", () => { console.log('Logged in as ${client.user.tag}!')})
client.on("messageCreate", msg => { 
    
    // if (msg.content === "ping") { msg.reply("pong");}
    if (!msg.author.bot) {
        the_content = msg.content //this saves more overhead ;; anything from bot is ignored
        msg.reply(the_content)

        /*
            respond to emojis
        */

        /* 
            visit websites 
        */

        /*
            pull up chat gpt
        */

        /*
            control flow on many users (i have no idea what he wants here)
            
        */
    }
    
})
client.login(process.env.DISCORD_TOKEN);