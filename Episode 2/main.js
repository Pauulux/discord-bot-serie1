const config = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", () => {
  console.log(`${bot.user.username} est en ligne !`);
  bot.user.setActivity('with Alex !');
})

bot.on("message", message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  const prefix = config.prefix;
  const messageArray = message.content.split(" ");
  const command = messageArray[0];
  const args = messageArray.slice(1);

  if (command === `${prefix}salut`) return message.channel.send("Salut tout le monde !");
});

bot.login(config.token);