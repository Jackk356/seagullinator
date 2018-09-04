const discord = require("discord.js");

module.exports.run = async (bot,message,args) => {

//!8ball <question inecdnjdncjnc>
if(!args[2]) return message.reply("Please supply me with a full question");
let replies = ["it is certain", 'it is decidedly so', 'without a doubt', 'yes definitely', 'you may rely on it', 'as I see it yes', 'most likely', 'outlook good', 'yes', 'signs point to yes', 'better not tell you now', 'dont count on it', 'my reply is no', 'oh hell no!', 'highly doubtful'];

let result = math.floor((math.random() * replies.length));
let question = args.slice(1).join(" ");

let ballembed = new discord.RichEmbed()
.setAuthor(message.author.tag, message.author.displayAvatarURL)
.setColor("")
.addField("Question", question)
.addField("Answer", replies[result]);

message.channel.send(ballembed);



}

module.exports.help = {
    name: "8ball"
}