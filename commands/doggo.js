const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot,message,args) => {

 let {body} = await superagent
 .get(`https://random.dog/woof.json`);

let doggoembed = new discord.RichEmbed()
.setColor("")
.setTitle("Cute doggo!")
.setDescription("Here is your picture of a cute doggo for you!")
.setImage(body.url)
.setAuthor(message.author.tag, message.author.displayAvatarURL)

message.channel.send(doggoembed);

}

module.exports.help = {
    name: "doggo"
}
