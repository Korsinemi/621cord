import * as fs from "fs/promises";
import {ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";

export async function run(command) {
	return command.deferReply().then(async () => command.reply(await fs.readFile(`./info/help/${command.options.getString("category")}.txt`)))
}

export const details = {
	name: "help",
	description: "view details on how the bot works",
	type: ApplicationCommandType.ChatInput,
	options: [{
		name: "category",
		description: "select which area you would like help in",
		type: ApplicationCommandOptionType.String,
		required: true,
		choices: [{
			name: "tags",
			value: "tags"
		},{
			name: "help",
			value: "help"
		},{
			name: "random",
			value: "random"
		},{
			name: "prefs",
			value: "prefs"
		}]
	}]
}
