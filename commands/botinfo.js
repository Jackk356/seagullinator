const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription('Bot Information')
    .setThumbnail(bicon)
    .setColor("#20E5BB")
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
}


module.exports.help = {
    name: "botinfo"
}