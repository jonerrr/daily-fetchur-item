const Discord = require("discord.js");
const client = new Discord.Client();

const config = require("../config.json");
const items = require("./items");

client.on("ready", () => {
  console.log(`logged in as ${client.user.tag}`);
  client.user.setStatus("online");
  client.user.setPresence({
    status: "idle",
    activity: {
      name: "events",
      type: "WATCHING",
    },
  });
});

console.log(items.length);

let oldDate = new Date(Date.now()).getDate();

client.on("message", async () => {
  const channel = client.channels.cache.get(config.channel);
  const webhooks = await channel.fetchWebhooks();
  const webhook = webhooks.first();

  try {
    const currentDate = new Date(Date.now()).getDate();
    if (oldDate !== currentDate) {
      await webhook.send(
        `<@&${config.role}>, **Today's daily fetchur item is**:  ${items[currentDate].item}`,
        {
          username: "Daily Fetchur Item",
          avatarURL: items[currentDate].image,
        }
      );

      oldDate = currentDate;
    }
  } catch (e) {
    console.log(e);
  }
});

// setInterval(() => {
//    sendEvent();
// }, 2000);

client.login(config.token);
