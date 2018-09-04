const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json")
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() ===   "js");
  if(jsfile.length <= 0){
    console.log("I couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
  
});



bot.on("ready", async () => {
   console.log(`${bot.user.username} is online!`);
   bot.user.setActivity('to the never ending sound of my creator crying because he sucks at coding', {type: "LISTENING"});
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server!`);

  let welcomechannel = message.guilds.channel.find(`name`, "welcome_leave");
  welcomechannel.send(`EVERYONE HIDE! ${member} has joined this shithole we call a server for no reason!`)
});

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} left the server! ;( `);

  let welcomechannel = message.guilds.channel.find(`name`, "welcome_leave");
  welcomechannel.send(`${member} has left this shithole we call a server!`)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args)

});

bot.login(tokenfile.token);