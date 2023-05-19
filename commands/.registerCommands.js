import * as Discord from "discord.js";
import * as Commands from "./.commands.js";
import {Bot} from "../../auth/SussE6.js";

var cmds = Object.entries(Commands).flatMap(a => Object.entries(a[1]).map(b => b[1].details));

console.log(cmds);

var client = new Discord.Client({intents: []});

client.on("ready", () => {
	client.application.commands.set(cmds).then(() => console.log("operation success")).then(() => process.exit(0));
});

client.login(Bot.token);
