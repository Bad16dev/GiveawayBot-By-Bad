const ms = require('ms');
module.exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: You Need To Have The Manage Messages Permissions To Reroll Giveaways.');
    }

    if(!args[0]){
        return message.reply(':x: You Have To Specify A Valid Message ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.reply('Unable To Find A Giveaway For `'+ args.join(' ') +'`.');
    }

    // Reroll the giveaway
    client.giveawaysManager.reroll(giveaway.messageID)
    .then(() => {
        // Success message
        message.reply('Giveaway Rerolled!');
    })
    .catch((e) => {
        if(e.startsWith(`Giveaway With Message ID ${giveaway.messageID} Is Not Ended.`)){
            message.reply('This Giveaway Is Not Ended!');
        } else {
            console.error(e);
            message.reply(e);
        }
    });

};
