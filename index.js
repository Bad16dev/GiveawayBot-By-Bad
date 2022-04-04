
const Discord = require("discord.js");
const client = new Discord.Client({ intents: 7753 });
const fs = require("fs");
const config = require("./config.json");
client.config = config;

const { GiveawaysManager } = require("discord-giveaways");
client.giveawaysManager = new GiveawaysManager(client, {
  storage: "./storage/giveaways.json",
  default: {
    botsCanWin: false,
    embedColor: "#000000",
    reaction: "🎉",
    lastChance: {
      enabled: true,
      content: `🛑 **Last Chance To Enter** 🛑`,
      threshold: 5000,
      embedColor: '#FF0000'
    }
  }
});



fs.readdir("./events/discord", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/discord/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   ✅  Ready : ${eventName}`);
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/discord/${file}`)];
  });
});



fs.readdir("./events/giveaways", (_err, files) => {
  files.forEach((file) => {
    if (!file.endsWith(".js")) return;
    const event = require(`./events/giveaways/${file}`);
    let eventName = file.split(".")[0];
    console.log(`[Event]   🎉 Ready : ${eventName}`);
    client.giveawaysManager.on(eventName, (...file) => event.execute(...file, client)), delete require.cache[require.resolve(`./events/giveaways/${file}`)];
  })
})

client.commands = new Discord.Collection();
fs.readdir("./commands/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    client.commands.set(commandName, {
      name: commandName,
      ...props
    });
    console.log(`[Command] ✅ Ready : ${commandName}`);
  });
});

client.interactions = new Discord.Collection();
client.register_arr = []
fs.readdir("./slash/", (_err, files) => {
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./slash/${file}`);
    let commandName = file.split(".")[0];
    client.interactions.set(commandName, {
      name: commandName,
      ...props
    });
    client.register_arr.push(props)
  });
});


client.login(config.token);
