const config = require("./config.json");
const Discord = require("discord.js");

const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", () => {
  console.log(`${bot.user.username} est en ligne !`);
  bot.user.setActivity("with Alex !");
});

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
      .addField(`${prefix}info`, "Renvoie des informations sur le bot");

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
      .addField(`${prefix}info`, "Renvoie des informations sur le bot")
      .addField(`${prefix}infoserv`, "Renvoie des informations sur le serveur");

    return message.channel.send(embed);
  }

  if (command === `${prefix}report`) {
    let reportedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );

    if (!reportedUser)
      return message.channel.send("L'utilisateur n'existe pas !");

    let reportedReason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#dc143c")
      .addField(
        "Utilisateur reporté",
        `${reportedUser} (ID: ${reportedUser.id})`
      )
      .addField(
        "Utilisateur ayant reporté",
        `${message.author} (ID: ${message.author.id})`
      )
      .addField("Canal", message.channel)
      .addField("Raison", reportedReason);

    let reportChannel = message.guild.channels.find(`name`, "reports");
    if (!reportChannel)
      return message.channel.send(
        "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
      );

    message.delete();
    reportChannel.send(reportEmbed);
  }

  if (command === `${prefix}kick`) {
    let kickedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!kickedUser)
      return message.channel.send("L'utilisateur n'existe pas !");
    let kickedReason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous n'avez pas les permissions.");

    if (kickedUser.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous ne pouvez pas kick cette personne.");

    let kickEmbed = new Discord.RichEmbed()
      .setDescription("Kicks")
      .setColor("#dc143c")
      .addField("Utilisateur kické", `${kickedUser} (ID: ${kickedUser.id})`)
      .addField(
        "Utilisateur ayant kické",
        `${message.author} (ID: ${message.author.id})`
      )
      .addField("Canal", message.channel)
      .addField("Raison", kickedReason);

    let kickChannel = message.guild.channels.find(`name`, "reports");
    if (!kickChannel)
      return message.channel.send(
        "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
      );

    message.delete();
    message.guild.member(kickedUser).kick(kickedReason);
    kickChannel.send(kickEmbed);
  }

  if (command === `${prefix}ban`) {
    let bannedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (!bannedUser)
      return message.channel.send("L'utilisateur n'existe pas !");
    let bannedReason = args.join(" ").slice(22);

    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous n'avez pas les permissions.");

    if (bannedUser.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send("Vous ne pouvez pas kick cette personne.");

    let banEmbed = new Discord.RichEmbed()
      .setDescription("Bans")
      .setColor("#dc143c")
      .addField("Utilisateur ban", `${bannedUser} (ID: ${bannedUser.id})`)
      .addField(
        "Utilisateur ayant ban",
        `${message.author} (ID: ${message.author.id})`
      )
      .addField("Canal", message.channel)
      .addField("Raison", bannedReason);

    let banChannel = message.guild.channels.find(`name`, "reports");
    if (!banChannel)
      return message.channel.send(
        "Le salon 'reports' est introuvable. Veuillez créer ce canal !"
      );

    message.delete();
    message.guild.member(bannedUser).ban(bannedReason);
    banChannel.send(banEmbed);
  }
});

bot.login(config.token);
