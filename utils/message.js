const config = require('../config.json');
module.exports = {
  giveaway:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY** 🎉",
  giveawayEnded:
    (config.everyoneMention ? "@everyone\n\n" : "") +
    "🎉 **GIVEAWAY ENDED** 🎉",
  drawing:  `Ends: **{timestamp}**`,
  inviteToParticipate: `React With 🎉 To Participate!`,
  winMessage: "Congratulations, {winners}! You Won **{this.prize}**!",
  embedFooter: "Giveaways",
  noWinner: "Giveaway Cancelled, No Valid Participations.",
  hostedBy: "Hosted By: {this.hostedBy}",
  winners: "Winner(s)",
  endedAt: "Ended At"
}
