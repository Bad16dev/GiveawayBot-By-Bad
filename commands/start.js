const ms = require("ms");
const messages = require("../utils/message");
module.exports.run = async (client, message, args) => {
  if (
    !message.member.permissions.has("MANAGE_MESSAGES") &&
    !message.member.roles.cache.some(r => r.name === "Giveaways")
  ) {
    return message.reply(
      ":x: You Need To Have The Manage Messages Permissions To Start Giveaways."
    );
  }

  let giveawayChannel = message.mentions.channels.first();
  if (!giveawayChannel) {
    return message.reply(":x: You Have To Mention A Valid Channel!");
  }

  let giveawayDuration = args[1];
  if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
    return message.reply(":x: You Have To Specify A Valid Duration!");
  }

  let giveawayNumberWinners = parseInt(args[2]);
  if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) {
    return message.reply(
      ":x: You Have To Specify A Valid Number Of Winners!"
    );
  }

  let giveawayPrize = args.slice(3).join(" ");
  if (!giveawayPrize) {
    return message.reply(":x: You Have To Specify A Valid Prize!");
  }
  await client.giveawaysManager.start(giveawayChannel, {
    duration: ms(giveawayDuration),
    prize: giveawayPrize,
    winnerCount: parseInt(giveawayNumberWinners),
    hostedBy: client.config.hostedBy ? message.author : null,
    messages
  });
  message.reply(`Giveaway Started In ${giveawayChannel}!`);
}
