module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
 const messages = require("../utils/message");
  let time = "";
  let winnersCount;
  let prize = "";
  let channel = "";
  const msg = await message.reply("🎉 Alright! Let's Set Up Your Giveaway! First, What Channel Do You Want The Giveaway In?" + `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`)
  let xembed = new Discord.MessageEmbed()
    .setTitle("Oops! Looks Like We Met A Timeout! 🕖")
    .setColor("#000000")
    .setDescription('You Took Too Much Time To Decide!\nUse ``create`` Again To Start A New Giveaway!\nTry To Respond With In **30 Seconds** This Time!' + `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`)
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp()

  const filter = m => m.author.id === message.author.id && !m.author.bot
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  })

  collector.on("collect", async collect => {

    const response = collect.content
    if(response == "cancel"){
      return collector.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }
    let chn =
      collect.mentions.channels.first() ||
      message.guild.channels.cache.get(response)
    if (!chn) {
      return msg.edit("You Provided An Invalid Channel!\n**Try Again?**\n Example: ``#giveaways``, ``677813783523098627``"+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`)
    } else {
      channel = chn
      collector.stop(
        msg.edit(`🎉 The Giveaway Will Be In ${channel}! Next, How Long Should This Giveaway Last?`+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`)
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {
      if(collect2.content == "cancel"){
      return collector2.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }

      let mss = ms(collect2.content);
      if (!mss) {
        return msg.edit(
            "You Provided Me With An Invalid Duration\n**Try Again?**\n Example: ``10 minutes``,``10m``,``10``"+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit(
              `🎉 Neat! Next, How Many Winners Should Participate In This Giveaway? `+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {
        const response3 = collect3.content.toLowerCase()
        if(response3 == "cancel"){
      return collector3.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit(
           
              "Winners Must Be A Number Or Greater Than Equal To One!\n**Try Again?**\n Example ``1``,``10``, Etcetra."+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit(
                `🎉 Alright, What Should Be The Prize For This Giveaway?`+ `\n\nYou May Cancel This Giveaway By Typing \`cancel\` In Chat`
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          if(response4 == "cancel"){
      return collector4.stop(msg.reply(`Cancelled Giveaway Creation.`))
    }
          prize = response4;
                collector4.stop(
                  msg.edit(
                    (`🎉 Done The Giveaway For \`${prize}\` Is Starting In ${channel}! Which Will Last For **${ms(
                        time,
                        { long: true }
                      )}** And There Will Be **${winnersCount}** Winner(s)!`
                    )
                  )
                )
                await collect.delete()
                await collect2.delete()
                await collect3.delete()
                await collect4.delete()
                
                client.giveawaysManager.start(channel, {
                  duration: parseInt(time),
                  prize: prize,
                  hostedBy: client.config.hostedBy ? message.author : null,
                  winnerCount: parseInt(winnersCount),
                  messages
                })
              });
          });
        });
      });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
       message.reply({ embeds: [xembed]})
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed]})
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
         message.reply({ embeds: [xembed]})

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

         message.reply({ embeds: [xembed]})
      }
    })
    collector5.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed]})
      }
    })
  } catch (e) {

  }
} 
