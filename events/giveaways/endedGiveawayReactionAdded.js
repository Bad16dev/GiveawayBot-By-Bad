const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member, reaction){
     reaction.users.remove(member.user);
  member.send(`**That Giveaway Has Already Ended!**`).catch(e => {})
  }
}