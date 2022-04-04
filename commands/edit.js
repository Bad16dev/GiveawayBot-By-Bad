module.exports.run = async (client, message) => {
  const Discord = require("discord.js");
  const ms = require("ms");
  let time = "";
  let winnersCount;
  let prize = "";
  let giveawayx = "";
  let embed = new Discord.MessageEmbed()
    .setTitle("Edit A Giveaway!")
    .setColor('#000000')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();
  const msg = await message.reply({
    embeds:
      [embed.setDescription(
        "Which Giveaway Would You Like To Edit?\nProvide The Giveaway Message's ID\n **Must Reply With In 30 Seconds!**"
      )]
  }
  );
  let xembed = new Discord.MessageEmbed()
    .setTitle("Oops! Looks Like We Met A Timeout! 🕖")
    .setColor("#000000")
    .setDescription('You Took Too Much Time To Decide!\nUse ``edit`` Again To Edit A Giveaway!\nTry To Respond With In **30 Seconds** This Time!')
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .setTimestamp();

  const filter = m => m.author.id === message.author.id && !m.author.bot;
  const collector = await message.channel.createMessageCollector(filter, {
    max: 3,
    time: 30000
  });

  collector.on("collect", async collect => {

    const response = collect.content;
    let gid = BigInt(response).toString()
    await collect.delete()
    if (!gid) {
      return msg.edit({
        embeds: [
          embed.setDescription(
            "You Provided An Invalid Message ID!\n**Try Again?**\n Example: ``954813675804438659``"
          )]
      }
      );
    } else {
      collector.stop(
        msg.edit({
          embeds: [
            embed.setDescription(
              `Alright! Next, What Would Be Our New Time For The Giveaway To Be Ended \n** Must Reply With In 30 Seconds!**`
            )]
        }
        )
      );
    }
    const collector2 = await message.channel.createMessageCollector(filter, {
      max: 3,
      time: 30000
    });
    collector2.on("collect", async collect2 => {

      let mss = ms(collect2.content);
      await collect2.delete()
      if (!mss) {
        return msg.edit({
          embeds: [
            embed.setDescription(
              "You Provided Me With An Invalid Duration\n**Try Again?**\n Example: ``-10 minutes``,``-10m``,``-10``\n **Note: - (minus) Inidicates You Want To Reduce The Time!**"
            )]
        }
        );
      } else {
        time = mss;
        collector2.stop(
          msg.edit({
            embeds: [
              embed.setDescription(
                `Alright! Next, How May Winners Should I Roll For The Giveaway Now?\n**Must Reply With In 30 Seconds.**`
              )]
          }
          )
        );
      }
      const collector3 = await message.channel.createMessageCollector(filter, {
        max: 3,
        time: 30000,
        errors: ['time']
      });
      collector3.on("collect", async collect3 => {

        const response3 = collect3.content.toLowerCase();
        await collect3.delete()
        if (parseInt(response3) < 1 || isNaN(parseInt(response3))) {
          return msg.edit({
            embeds: [
              embed.setDescription(
                "Winners Must Be A Number Or Greater Than Equal To One!\n**Try Again?**\n Example ``1``,``10``, Etcetra."
              )]
          }
          );
        } else {
          winnersCount = parseInt(response3);
          collector3.stop(
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Alright, What Should Be The New Prize For The Giveaway?\n**Must Reply With In 30 Seconds!**`
                )]
            }
            )
          );
        }
        const collector4 = await message.channel.createMessageCollector(
          filter,
          { max: 3, time: 30000 }
        );
        collector4.on("collect", async collect4 => {

          const response4 = collect4.content.toLowerCase();
          prize = response4;
          await collect4.delete()
          collector4.stop(
            console.log(giveawayx),
            msg.edit({
              embeds: [
                embed.setDescription(
                  `Edited`
                )]
            }
            )
          );
          client.giveawaysManager.edit(gid, {
            newWinnersCount: winnersCount,
            newPrize: prize,
            addTime: time
          })
        });
      });
    });
  });
  collector.on('end', (collected, reason) => {
    if (reason == 'time') {
      message.reply({ embeds: [xembed] });
    }
  })
  try {
    collector2.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    });
    collector3.on('end', (collected, reason) => {
      if (reason == 'time') {
        message.reply({ embeds: [xembed] });

      }
    })
    collector4.on('end', (collected, reason) => {
      if (reason == 'time') {

        message.reply({ embeds: [xembed] });
      }
    })
  } catch (e) { }
}
