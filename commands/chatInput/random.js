import * as ReplyBuilder from "../../src/replyBuilder.js";
import * as E6Api from "../../src/e6Wrapper.js";
import {Tags} from "../../src/tagManager.js";
import {ApplicationCommandType, ApplicationCommandOptionType} from "discord.js";
import {getUserPrefs} from "../../src/persistence/dataManager.js";

const contextEnum = {true: "NSFW", false: "SFW", undefined: "DM", null: "DM"}
export async function run(command) {
	let tList = new Tags(command.options.getString("tags"));
	var tags;
	{
		tags = await getUserPrefs(command.user.id, command.channel);
		tags.add(tList.tagList); // throwing from here? tf goin on here :face_with_raised_eyebrow:
		// SON OF A GUN IT WAS THE FOREACH ALL ALONG
		if (command.channel?.nsfw) tags.exclude("young");
		else tags.add("rating:s", "-rating:q", "-rating:e");
		// yknow i'd replace these but if i do it this way people can default THEN get their specials THEN
	}
	return command.reply(ReplyBuilder.embed(await E6Api.getRandomPost(tags)));
}

export const details = {
	name: "random",
	description: "get a random post from e6",
	type: ApplicationCommandType.ChatInput,
	options: [{
		type: ApplicationCommandOptionType.String,
		name: "tags",
		description: "specify which tags you want to be used in the search",
		required: false
	}]
};
