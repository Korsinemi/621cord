"use strict";

import * as Discord from "discord.js";
import {Bot} from "../auth/SussE6.js";
import * as Persistence from "./src/persistence/dataManager.js";

import * as Commands from "./commands/.commands.js";
import * as Buttons from "./buttons/.buttons.js";
import * as Modals from "./modals/.modals.js";

const client = new Discord.Client({intents: [
	Discord.IntentsBitField.Flags.Guilds,
	Discord.IntentsBitField.Flags.GuildMessages,
	Discord.IntentsBitField.Flags.DirectMessages,
	Discord.IntentsBitField.Flags.GuildWebhooks,
	Discord.IntentsBitField.Flags.MessageContent
]});

// process.exit(0);

client.on("interactionCreate", async (interaction) => {
	if (interaction.isChatInputCommand())
		return handleChatInputCommand(interaction);
	if (interaction.isButton())
		return handleButton(interaction);
	if (interaction.isModalSubmit())
		return handleModal(interaction);
});
async function handleChatInputCommand(command) {
	if (!Persistence.canUse(command.user))
		return Commands.ChatInput.verify.run(command);
	return Commands.ChatInput[command.commandName].run(command);
}
async function handleButton(button) {
	return Buttons[button.customId].run(button);
}
async function handleModal(modal) {
	return Modals[modal.customId].run(modal);
}



client.on("ready", () => {
	console.log("ready...");
});
client.login(Bot.token);
