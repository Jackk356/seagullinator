const Discord = require("discord.js");

module.exports.run = async (bot, message, args) =>{
    if (!args[0]) return message.reply("Please mention someone to kick.");
           let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
           if(!kUser) return message.channel.send(":warning:I can't find that user!:warning:");
           let kReason = args.join(" ").slice(22);
           if (!kReason) return message.reply("Supply a reason you dumb kangaroo!");
           if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Oi, What do you think ya doin' mate?");
           if(kUser.hasPermission("MANAGE_MESSAGES")) return message.reply(":warning:That person can't be kicked, mate!:warning:");
    
           let kickEmbed = new Discord.RichEmbed()
           .setDescription("~Kick~")
           .setColor("#FF0000")
           .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
           .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
           .addField("Kicked in", message.channel)//Will display #deleted-channel for the user as they are not longer apart of the guild.
           .addField("Time", message.createdAt)
           .addField("Reason", kReason);   
    
           try{
             await message.guild.member(kUser).kick(kReason);
             await kUser.send(kickEmbed)
           }catch(e){message.reply(e)}
       
           let kickchannel = message.guild.channels.find(`name`, "incidents");
           if(!kickchannel) return message.channel.send(":warning:I cannot find an incidents channel:warning:");
       
           message.delete().catch(O_o=>{});
           kickchannel.send(kickEmbed);
    }


module.exports.help = {
    name: "kick"
}