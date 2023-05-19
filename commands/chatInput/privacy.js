
import * as fs from "fs/promises";
import {ApplicationCommandType} from "discord.js";


export function run(command) {
	return command.deferReply().then(() => {
		let tos = fs.readFile("./info/privacy.txt");
		tos.then(text => command.reply({content: text, ephemeral: true}))
	});
}

export const details = {
	name: "privacy",
	description: "view the privacy policy",
	type: ApplicationCommandType.ChatInput,
	options: []
};
