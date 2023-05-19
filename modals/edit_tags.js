import {Tags} from "../src/tagManager.js";
import {ModalBuilder, ActionRowBuilder, TextInputBuilder} from "discord.js";
import * as ReplyBuilder from "../src/replyBuilder.js";
import * as E6Api from "../src/e6Wrapper.js";
import * as persistence from "../src/persistence/dataManager.js";

const contextEnum = {true: "NSFW", false: "SFW", undefined: "DM", null: "DM"}
const tagsEnum = {true: "-child", false: "rating:s -rating:q -rating:e", null: "", undefined: ""}

export async function run(modal) {
	if (!modal.isFromMessage())
		return console.error(">>> recieved modal edit_tags without message");
	var tags = new Tags(modal.fields.getField("tags").value + " " + tagsEnum[modal.message.channel.nsfw]);
	return modal.deferUpdate().then(async () => {
		return modal.editReply(ReplyBuilder.embed(await E6Api.getRandomPost(tags)));
	})
}

export function construct(interaction) {
	return new ModalBuilder()
		.setTitle(`Change Search Tags`)
		.setCustomId('edit_tags')
		.addComponents([
			new ActionRowBuilder().addComponents([
				new TextInputBuilder().setCustomId("tags")
					.setLabel("Tags")
					.setStyle(1)
					.setValue(Tags.fromURL(interaction.message.embeds[0].url).strList)
					.setRequired(false)
			])
		])
}

/*
let tags = command.options.getString("tags") ?? "";
tags = new Tags(tags.split(/[ \+]+/));
await persistence.setUserPrefs(command.user.id, tags, command.channel);
tags = await persistence.getUserPrefs(command.user.id, command.channel);
return command.reply({content: `Your tags here: \`${tags?.tagList?.join(" ")}\``, ephemeral: true});
*/
