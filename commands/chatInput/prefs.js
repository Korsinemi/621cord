import * as persistence from "../../src/persistence/dataManager.js";
import {Tags} from "../../src/tagManager.js";
import {ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";

const contextEnum = {true: "NSFW", false: "SFW", undefined: "DM", null: "DM"}
export async function run(command) {
	let tags = command.options.getString("tags") ?? "";
	tags = new Tags(tags.split(/[ \+]+/));
	await persistence.setUserPrefs(command.user.id, tags, command.channel);
	// console.log(tags);
	tags = await persistence.getUserPrefs(command.user.id, command.channel);
	return command.reply({content: `Your tags here: \`${tags?.tagList?.join(" ")}\``, ephemeral: true});
}

export const details = {
	name: "prefs",
	description: "manage your default tags",
	type: ApplicationCommandType.ChatInput,
	options: [{
		type: ApplicationCommandOptionType.String,
		name: "tags",
		description: "specify how you wish to change your tags",
		required: false
	}]
};
