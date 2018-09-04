const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

let {body} = await superagent
.get(`http://aws.random.cat//meow`);

let catembed = new discord.RichEmbed()
.setColor("#f7049e")
.setTitle("Cute kitty")
.setDescription("Here is your picture of a cute kitty!")
.setImage(body.file)
.setAuthor(message.author.tag, message.author.displayAvatarURL);

message.channel.send(catembed);

}

module.exports.help = {
    name: "cat"
}
