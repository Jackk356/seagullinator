const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

    //!tempmute @user 1s/m/h/d
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Soz mate, couldn't find that user!");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("They avoided your wrath because they are cool!");
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role 
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
            name: "muted",
            color: "#FF0000",
            permissions:[]
            })
            message.guild.channels.forEach(async (channel, id) => {
              await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false  
            });
        });  
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply(`How do I mute ${tomute} if I don't know how long for?`);

    await(tomute.addRole(muterole.id));
    message.reply(`<@${tomute.id}> has been muted for ${ms(ms(mutetime))}`);
    let tempmuteEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL)
    .setDescription(`~Muted~`)
    .setColor("#FF0000")
    .addField("Muted User", `${tomute} with ID: ${tomute.id}`)
    .addField("Muted By", `<@${message.author.id}> with ID: ${message.author.id}`)
    .addField("Muted in", message.channel)
    .addField("Time", message.createdAt)
    let tempmutechannel = message.guild.channels.find(`name`, "incidents");
           if(!tempmutechannel) return message.channel.send(":warning:I cannot find an incidents channel:warning:");
       
           message.delete().catch(O_o=>{});
           tempmutechannel.send(tempmuteEmbed);
           message.channel.send(tempmuteEmbed)
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has now been unmuted!`);
    }, ms(mutetime));


//end of module
}

module.exports.help = {
    name: "tempmute"
}