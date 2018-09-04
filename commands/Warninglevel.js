const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");
let warns = JSON.parse(fs.readFileSync("./Warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {

if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have perms for that, mate.");
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
if(!wUser) return message.reply("I couldn't find that person!");
let warnlevel = warns[wUser.id].warns;

message.reply(`${wUser.id} has ${warnlevel} warns`);

}

module.exports.help = {
    name: "warninglevel"
}