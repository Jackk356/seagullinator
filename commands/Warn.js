const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./Warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

//!warn @user <reason>
    if(!args[0]) return msg.reply("Supple some args mate!");
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("You can't do that dumbdumb");
    let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
    if(!wUser) return message.reply("I couldn't find that person!");
    if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They survive your wrath due to being lucky (and having perms)!");
    let reason = args.join(" ").slice(22);

    if(warns[wUser.id]) warns[wUser.id] = {
    warns: 0
    };

    warns[wUser.id].warns++;

    fs.writeFile("./Warnings.json", JSON.stringify(warns), (err) => {
        if(err) console.log(err)
    });

    let warnEmbed = new Discord.RichEmbed()
    .setDescription("~Warn~")
    .setAuthor(message.author.u)
    .setColor("#3CD037")
    .addField("Warned User", `${wUser} with the ID: ${wUser.id}`)
    .addField("Warned In", message.channel)
    .addField("Number Of Warns For This User", warns[wUser.id])
    .addField("Reason", reason);

    let warnchannel = message.guild.channels.find(`name`, "incidents");
    if(!warnchannel) return message.reply("I could not find an incidents channel!");

    warnchannel.send(warnEmbed);

    if(warns[wUser.id].warns == 2){
    let muterole = message.guild.roles.find(`name`, "Muted");
    if(!muterole) return message.reply("You should probably make the role!");

    let mutetime = "10s";
    await(wUser.addRole(muterole.id));
    message.channel.send(`${wUser.tag} has been temporarily muted!`);

    setTimeout(function(){
        wUser.removeRole(muterole.id)
        message.reply(`${wUser.tag} has now been unmuted!`)
    }, ms(mutetime))
    }
    if(warns[wUser.id].warns == 3){
        message.guild.member(wUser).ban(reason);
        message.channel.send(`${wUser.tag}has been banned `)
}

}

module.exports.help = {
    name: "warn"
}
