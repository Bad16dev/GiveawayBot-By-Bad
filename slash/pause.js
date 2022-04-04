module.exports = {
    name: "pause",
    description: '⏸ Pause A Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The Giveaway To Pause (Message ID Or Giveaway Prize)',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You Need To Have The Manage Messages Permissions To Pause Giveaways.',
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

        if (giveaway.pauseOptions.isPaused) {
            return interaction.reply({
                content: `**[This giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})**  Is Already Paused.`,
                ephemeral: true
            });
        }

        client.giveawaysManager.pause(giveaway.messageId)
            .then(() => {
                interaction.reply(`**[This giveaway](https://discord.com/channels/${giveaway.guildId}/${giveaway.channelId}/${giveaway.messageId})** Has Now Been Paused!`);
            })
            .catch((e) => {
                interaction.reply({
                    content: e,
                    ephemeral: true
                });
            });

    }
};