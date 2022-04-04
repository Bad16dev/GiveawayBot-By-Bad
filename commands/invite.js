const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const config = require('../config.json');

module.exports.run = async (client, message, args) => {
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
        .setLabel(`Invite ${client.user.username}`)
        .setStyle('LINK')
        .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`),
        new MessageButton()
        .setLabel('Developer Server')
        .setStyle('LINK')
        .setURL("https://discord.gg/flou"),
    )
    let invite = new MessageEmbed()
    .setAuthor(`Invite ${client.user.username} `, client.user.avatarURL())
    .setTitle("Invite & Support Link!")
    .setDescription(`Invite ${client.user} To Your Server And Enjoy With Advanced Features!`)
    .setColor('#000000')
    .setTimestamp()
    .setFooter(`Requested By ${message.author.tag} | GiveawayBot V1.0 By Bad`, message.author.displayAvatarURL())
    message.reply({ embeds: [invite], components: [row]});
}
