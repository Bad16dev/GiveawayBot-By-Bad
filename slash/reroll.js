module.exports = {
    name: "reroll",
    description: '🎉 Reroll A Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The Giveaway To Reroll (Message ID Or Prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You Need To Have The Manage Messages Permission To Reroll Giveaways.',
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

        if (!giveaway.ended) {
            return interaction.reply({
                content: `[This Giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}) Has Not Been Ended Yet`,
                ephemeral: true
            });
        }

        client.giveawaysManager.reroll(giveaway.messageId)
            .then(() => {
                interaction.reply(`Rerolled **[This Giveaway](<https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId}>)!**`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};