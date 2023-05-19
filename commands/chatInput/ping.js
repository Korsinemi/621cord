import {ApplicationCommandType} from "discord.js";

export function run (command) {
	return command.reply("pong");
}

export const details = {
	name: "ping",
	description: "ping the bot",
	type: ApplicationCommandType.ChatInput,
	options: []
};
