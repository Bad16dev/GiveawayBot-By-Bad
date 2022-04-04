module.exports = {
    name: "end",
    description: '🎉 End An Already Running Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The Giveaway To End (Message ID or Giveaway Prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You Need To Have The Manage Messages Permissions To End Giveaways.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('giveaway');

        const giveaway =
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        if (!giveaway) {
            return interaction.reply({
                content: 'Unable To Find A Giveaway For `' + query + '`.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'This Giveaway Has Already Ended!',
                ephemeral: true
            });
        }

        client.giveawaysManager.end(giveaway.messageId)
            .then(() => {
                interaction.reply(`**[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** Has Now Ended!`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};