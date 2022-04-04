module.exports = {
    name: 'edit',
    description: '🎉 Edit A Giveaway',

    options: [
        {
            name: 'giveaway',
            description: 'The Giveaway Ao End (message ID)',
            type: 'STRING',
            required: true
        },
        {
            name: 'duration',
            description: 'Setting Time Of Mentioned Giveaway. Eg. 1h Sets The Current Giveaway To End After An Hour!',
            type: 'STRING',
            required: true
        },
        {
            name: 'winners',
            description: 'How Many Winners The Giveaway Should Have',
            type: 'INTEGER',
            required: true
        },
        {
            name: 'prize',
            description: 'What The Prize Of The Giveaway Should Be',
            type: 'STRING',
            required: true
        }
    ],

    run: async (client, interaction) => {

        if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
            return interaction.reply({
                content: ':x: You Need To Have The Manage Messages Permissions To Start Giveaways.',
                ephemeral: true
            });
        }
        const gid = interaction.options.getString('giveaway');
        const time = interaction.options.getString('duration');
        const winnersCount = interaction.options.getInteger('winners');
        const prize = interaction.options.getString('prize');
        
        await interaction.deferReply({
         ephemeral: true
        })
        try {
        await client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
        })
        } catch(e) {
return interaction.editReply({
            content:
                `No Giveaway Found With The Given Message ID: \`${gid}\``,
            ephemeral: true
        });
        }
        interaction.editReply({
            content:
                `This Giveaway Has Now Been Edited!`,
            ephemeral: true
        });
    }

};
