const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    if (!args[0]) return message.reply("Please mention someone to ban");
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(":warning:I can't find that user!:warning:");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Oi, What do you think ya doin' mate?");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel(":warning:That person can't be kicked, mate!:warning:");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#FF0000")
    .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
    .addField("banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("banned in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);   

    let incidentschannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentschannel) return message.channel.send(":warning:I cannot find an incidents channel:warning:");

    message.guild.member(bUser).ban(bReason);
    banchannel.send(banEmbed);    
    
    message.delete().catch(O_o=>{});
    banchannel.send(banEmbed);
    return bUser.send(banEmbed);
}


module.exports.help = {
    name: "ban"
}