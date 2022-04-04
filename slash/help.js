const { MessageEmbed , MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports = {
    name: 'help',
    description: '📜 View All The Commands Of The Bot!',
    run: async (client, interaction) => {
        const embed = new MessageEmbed()
        .setTitle(`Commands of ${client.user.username}`)
        .setColor('#00000')
        .setDescription('**Please Select A Category To View All Commands**')
        .addField(`Links:`,`- [Developer Channel](https://www.youtube.com/channel/UCKh6D-uY87Bb0y0w7XqUlzQ)\n- [Developer Server](https://discord.gg/flou)`,true)
        .setTimestamp()
        .setFooter(`Requested By ${interaction.user.username} | GiveawayBot V1.0 By Bad`, interaction.user.displayAvatarURL());
        
          const giveaway = new MessageEmbed()
          .setTitle("Categories » Giveaway")
          .setColor('#00000')
          .setDescription("```yaml\nHere Are The Giveaway Commands:```")
          .addFields(
            { name: 'Create / Start'  , value: `Start a Giveaway In Your Guild!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Edit' , value: `Edit An Already Running Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'End' , value: `End An Already Running Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'List' , value: `List Of All The Giveaways Running In Guild!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Pause' , value: `Pause An Already Running Giveaway!\n > **Type: __\`slash\`__**`, inline: true },
            { name: 'Reroll' , value: `Reroll An Ended Giveaway!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Resume' , value: `Resume A Paused Giveaway!\n > **Type: __\`slash\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested By ${interaction.user.username} | GiveawayBot V1.0 By Bad`, interaction.user.displayAvatarURL());
        
        
          const general = new MessageEmbed()
          .setTitle("Categories » General")
          .setColor('#00000')
          .setDescription("```yaml\nHere Are The General Bot Commands:```")
          .addFields(
            { name: 'Help'  , value: `Shows All Commands Of This Bot!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Invite' , value: `Get The Bot Invite Link!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
            { name: 'Ping' , value: `Check The Bot Ping!\n > **Types: __\`slash\` / \`message\`__**`, inline: true },
          )
          .setTimestamp()
          .setFooter(`Requested By ${interaction.user.username} | GiveawayBot V1.0 By Bad`, interaction.user.displayAvatarURL());
        
          const components = (state) => [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                .setCustomId("help-menu")
                .setPlaceholder("Please Select A Category")
                .setDisabled(state)
                .addOptions([{
                        label: `Giveaways`,
                        value: `giveaway`,
                        description: `View All The Giveaway Commands!`,
                        emoji: `🎉`
                    },
                    {
                        label: `General`,
                        value: `general`,
                        description: `View All The General Commands!`,
                        emoji: `⚙`
                    }
                ])
            ),
        ];
        
        const initialMessage = await interaction.reply({ embeds: [embed], components: components(false) });
        
        const filter = (interaction) => interaction.user.id === interaction.member.id;
        
                const collector = interaction.channel.createMessageComponentCollector(
                    {
                        filter,
                        componentType: "SELECT_MENU",
                        time: 300000
                    });
        
                collector.on('collect', (interaction) => {
                    if (interaction.values[0] === "giveaway") {
                        interaction.update({ embeds: [giveaway], components: components(false) });
                    } else if (interaction.values[0] === "general") {
                        interaction.update({ embeds: [general], components: components(false) });
                    }
                });
                collector.on('end', () => {
                  initialMessage.update({ components: components(true) });
              }
              )
    },
};
