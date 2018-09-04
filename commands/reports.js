const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
        //!report @jackaroo this is the reason
        if (!args[0]) return message.reply("Please mention someone to report");
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send(":warning:I could not find that user!:warning:");
        let reason = args.join(" ").slice(22);
        if (!reason) return message.reply("Supply a reason you dumb kangaroo!");
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Oi, What do you think ya doin' mate?");
        if(rUser.hasPermission("MANAGE_MESSAGES")) return message.reply(":warning:That person can't be reported, mate!:warning:");
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#FF0000")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", reason);
    
        let reportschannel= message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send(":warning:Couldn't find reports channel!:warning:");
    
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
        return message.channel.send(reportEmbed);

}

module.exports.help = {
    name: "report"
}
