const Discord = require("discord.js")
module.exports = {
  async execute(giveaway, member) {
    return member.send({
      embeds: [new Discord.MessageEmbed()
        .setTimestamp()
        .setTitle('❓ Hold Up Did You Just Remove A Reaction From A Giveaway?')
        .setColor("#000000")
        .setDescription(
          `Your Entery To [This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) Was Recorded But You Un-Reacted, Since You Don't Need **${giveaway.prize}** I Would Have To Choose Someone Else`
        )
        .setFooter("Think It Was A Mistake? Go React Again!")
      ]
    }).catch(e => {})

  }
}