exports.run = async (client, message, args) => {

    if(!message.member.permissions.has('MANAGE_MESSAGES') && !message.member.roles.cache.some((r) => r.name === "Giveaways")){
        return message.reply(':x: You Need To Have The Manage Messages Permissions To Reroll Giveaways.');
    }

    if(!args[0]){
        return message.reply(':x: You Have To Specify A Valid Message ID!');
    }

    let giveaway = 
    client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) ||
    client.giveawaysManager.giveaways.find((g) => g.messageId == args[0]);

    if(!giveaway){
        return message.reply('Unable To Find A Giveaway For `'+ args.join(' ') + '`.');
    }

  client.giveawaysManager.end(giveaway.messageId)
    .then(() => {
        message.reply('Giveaway Ended.');
    }).catch((e) => {
            message.reply({
                content: e
            });
    })

};
