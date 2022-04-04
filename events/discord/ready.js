const register = require('../../utils/slashsync');
module.exports = async (client) => {
  await register(client, client.register_arr.map((command) => ({
    name: command.name,
    description: command.description,
    options: command.options,
    type: 'CHAT_INPUT'
  })), {
    debug: true
  });
  console.log(`[ / | Slash Command ] - ✅ Loaded All Slash Commands!`)
  let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=applications.commands%20bot`;
  console.log(`[STATUS] ${client.user.tag} Is Now Online!\n[INFO] Bot By Bad https://www.youtube.com/channel/UCKh6D-uY87Bb0y0w7XqUlzQ\n[Invite Link] ${invite}`);
  const activities = [`All Giveaways Running Smoothly`];
  setInterval(() => {
    let activity = activities[Math.floor(Math.random() * activities.length)];
    client.user.setActivity(activity, { type: "WATCHING" });
  }, 20000);

};
