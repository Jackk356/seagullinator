const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    //!addrole @user <role name>
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("soz mate, no can do!");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("fam, can't find that geezer");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("How do you expect me to add a role if you don't specify the role?");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("fam, I couldn't find that role");

    if(!rMember.roles.has(gRole.id)) return message.reply("How do you expect me to give them a role they already have?");
    await(rMember.addRole(gRole.id));

    try{
      await  rMember.send(`Congrats, you just received the role ${gRole.name}`)  
    }catch(e) {
      message.channel.send(`Congrats to <@${rMember.id}>, they just received the role ${gRole.name}. I tried to slide into their DM but their DMs were locked:cry:`);
    }

}

module.exports.help = {
    name: "addrole"
}