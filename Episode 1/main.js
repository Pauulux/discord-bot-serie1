const config = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
  console.log(`${bot.user.username} est en ligne !`);
  bot.user.setActivity('with Alex !');
})

bot.login(config.token);