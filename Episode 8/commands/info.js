const Discord = require("discord.js");
const prefix = "!";

module.exports.run = async (bot, message, args) => {
  let botIcon = bot.user.displayAvatarURL;
  let embed = new Discord.RichEmbed()
    .setDescription("Informations sur le bot")
    .setColor("#dc143c")
    .setThumbnail(botIcon)
    .addField("Nom du bot", bot.user.username)
    .addField("Créer le", bot.user.createdAt)
    .addField("Commandes", "-----------")
    .addField(`${prefix}info`, "Renvoie des informations sur le bot")
    .addField(`${prefix}infoserv`, "Renvoie des informations sur le serveur")
    .addField(`${prefix}report`, "Reporter un utilisateur avec une raison")
    .addField(`${prefix}kick`, "Kick un utilisateur avec une raison")
    .addField(`${prefix}ban`, "Ban un utilisateur avec une raison");

  return message.channel.send(embed);
};

module.exports.help = {
  name: "info"
};
