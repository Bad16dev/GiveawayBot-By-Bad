const Discord = require("discord.js")
const messages = require("../utils/message");
const ms = require("ms")
module.exports = {
  name: 'start',
  description: '🎉 Start A Giveaway',

  options: [
    {
      name: 'duration',
      description: 'How Long The Giveaway Should Last For. Example Values: 1m, 1h, 1d',
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
    },
    {
      name: 'channel',
      description: 'The Channel To Start The Giveaway In',
      type: 'CHANNEL',
      required: true
    },
    {
      name: 'bonusrole',
      description: 'Role Which Would Recieve Bonus Entries',
      type: 'ROLE',
      required: false
    },
    {
      name: 'bonusamount',
      description: 'The Amount Of Bonus Entries The Role Will Recieve',
      type: 'INTEGER',
      required: false
    },
    {
      name: 'invite',
      description: 'Invite Of The Server You Want To Add As Giveaway Joining Requirement',
      type: 'STRING',
      required: false
    },
    {
      name: 'role',
      description: 'Role You Want To Add As Giveaway Joining Requirement',
      type: 'ROLE',
      required: false
    },
  ],

  run: async (client, interaction) => {

    if (!interaction.member.permissions.has('MANAGE_MESSAGES') && !interaction.member.roles.cache.some((r) => r.name === "Giveaways")) {
      return interaction.reply({
        content: ':x: You Need To Have The Manage Messages Permissions To Start Giveaways.',
        ephemeral: true
      });
    }

    const giveawayChannel = interaction.options.getChannel('channel');
    const giveawayDuration = interaction.options.getString('duration');
    const giveawayWinnerCount = interaction.options.getInteger('winners');
    const giveawayPrize = interaction.options.getString('prize');

    if (!giveawayChannel.isText()) {
      return interaction.reply({
        content: ':x: Please Select A Text Channel!',
        ephemeral: true
      });
    }
   if(isNaN(ms(giveawayDuration))) {
    return interaction.reply({
      content: ':x: Please Select A Valid Duration!',
      ephemeral: true
    });
  }
    if (giveawayWinnerCount < 1) {
      return interaction.reply({
        content: ':x: Please Select A Valid Winner Count! Greater Or Equal To One.',
      })
    }

    const bonusRole = interaction.options.getRole('bonusrole')
    const bonusEntries = interaction.options.getInteger('bonusamount')
    let rolereq = interaction.options.getRole('role')
    let invite = interaction.options.getString('invite')

    if (bonusRole) {
      if (!bonusEntries) {
        return interaction.reply({
          content: `:x: You Must Specify How Many Bonus Entries Would ${bonusRole} Recieve!`,
          ephemeral: true
        });
      }
    }


    await interaction.deferReply({ ephemeral: true })
    let reqinvite;
    if (invite) {
      let invitex = await client.fetchInvite(invite)
      let client_is_in_server = client.guilds.cache.get(
        invitex.guild.id
      )
      reqinvite = invitex
      if (!client_is_in_server) {
        return interaction.editReply({
          embeds: [{
            color: "#000000",
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            },
            title: "Server Check!",
            url: "https://www.youtube.com/channel/UCKh6D-uY87Bb0y0w7XqUlzQ",
            description:
              "You Need To Invite Me There To Set That As A Requirement!",
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Server Check"
            }
          }]
        })
      }
    }

    if (rolereq && !invite) {
      messages.inviteToParticipate = `**React With 🎉 To Participate!**\n>>> - Only Members Having ${rolereq} Are Allowed To Participate In This Giveaway!`
    }
    if (rolereq && invite) {
      messages.inviteToParticipate = `**React With 🎉 To Participate!**\n>>> - Only Members Having ${rolereq} Are Allowed To Participate In This Giveaway!\n- Members Are Required To Join [This Server](${invite}) To Participate In This Giveaway!`
    }
    if (!rolereq && invite) {
      messages.inviteToParticipate = `**React With 🎉 To Participate!**\n>>> - Members Are Required To Join [This Server](${invite}) To Participate In This Giveaway!`
    }


    client.giveawaysManager.start(giveawayChannel, {
      duration: ms(giveawayDuration),
      prize: giveawayPrize,
      winnerCount: parseInt(giveawayWinnerCount),
      bonusEntries: [
        {
          bonus: new Function('member', `return member.roles.cache.some((r) => r.name === \'${bonusRole ?.name}\') ? ${bonusEntries} : null`),
          cumulative: false
        }
      ],
      messages,
      extraData: {
        server: reqinvite == null ? "null" : reqinvite.guild.id,
        role: rolereq == null ? "null" : rolereq.id,
      }
    });
    interaction.editReply({
      content:
        `Giveaway Started In ${giveawayChannel}!`,
      ephemeral: true
    })

    if (bonusRole) {
      let giveaway = new Discord.MessageEmbed()
        .setAuthor(`Bonus Entries Alert!`)
        .setDescription(
          `**${bonusRole}** Has **${bonusEntries}** Extra Entries In This Giveaway!`
        )
        .setColor("#000000")
        .setTimestamp();
      giveawayChannel.send({ embeds: [giveaway] });
    }

  }

};
