"use strict";

import * as ReplyBuilder from "../src/replyBuilder.js";
import * as E6Api from "../src/e6Wrapper.js";
import {Tags} from "../src/tagManager.js";
import {ButtonBuilder} from "discord.js";

export async function run(button) {
	let tags = null;
	// button.reply("working on smth gimme a sec");
	if (button.message.interaction.user.id !== button.user.id) return button.followUp({content: "you can only refresh your own button interactions", ephemeral: true});
	await button.deferUpdate().then(async () => {
		tags = Tags.fromURL(button.message.embeds[0].url);
		return button.editReply(ReplyBuilder.embed(await E6Api.getRandomPost(tags)));
	}).catch((error) => {
		button.followUp({content: "i can't access this message for some reason", ephemeral: true});
		console.error(error);
	});
}

export const component = new ButtonBuilder().setCustomId("new_random_post").setEmoji("🔄")
	.setStyle(1);
