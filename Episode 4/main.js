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

  if (command === `${prefix}infoserv`) {
    let servIcon = message.guild.iconURL;
    let servEmbed = new Discord.RichEmbed()
      .setDescription("Informations sur le bot")
      .setColor("#dc143c")
      .setThumbnail(servIcon)
      .addField("Nom du serveur", message.guild.name)
      .addField("Nombre total de membre", message.guild.memberCount)
      .addField("Créer le", message.guild.createdAt)
      .addField("Vous avez rejoint le", message.member.joinedAt)
      .addField(`${prefix}info`, 'Renvoie des informations sur le bot');

    return message.channel.send(servEmbed);
  }

  if (command === `${prefix}info`) {
    let botIcon = bot.user.displayAvatarURL;
    let embed = new Discord.RichEmbed()
      .setDescription("Informations sur le bot")
      .setColor("#dc143c")
      .setThumbnail(botIcon)
      .addField("Nom du bot", bot.user.username)
      .addField("Créer le", bot.user.createdAt)
      .addField("Commandes", "-----------")
      .addField(`${prefix}info`, 'Renvoie des informations sur le bot')
      .addField(`${prefix}infoserv`, 'Renvoie des informations sur le serveur');

    return message.channel.send(embed);
  }
});

bot.login(config.token);