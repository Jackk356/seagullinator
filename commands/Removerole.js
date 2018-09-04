const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("soz mate, no can do!");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("fam, can't find that geezer");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("How do you expect me to add a role if you don't specify the role?");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("fam, I couldn't find that role");

    if(!rMember.roles.has(gRole.id)) return message.reply("I can't remove a role they don't have, idiot!");
    await(rMember.removeRole(gRole.id));

    try{
      await  rMember.send(`Rest In Pepperonis, you just got the ${gRole.name} role taken away from you!`)  
    }catch(e) {
      message.channel.send(`Rest In Pepperonis to <@${rMember.id}>, they just got the role ${gRole.name} removed!. I tried to slide into their DM but their DMs were locked:cry:`);
    }
}

module.exports.help = {
    name: "removerole"
}