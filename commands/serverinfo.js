const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    let sicon = message.guild.iconURL;
    let serverinfoembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription("Server Information")
    .setColor("#0FE0F1")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members For This Server", message.guild.memberCount);

    return message.channel.send(serverinfoembed);
}


module.exports.help = {
    name: "serverinfo"
}