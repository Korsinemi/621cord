"use strict";

import {EmbedBuilder, ActionRowBuilder, ButtonBuilder} from "discord.js";
import * as Buttons from "../buttons/.buttons.js"

export function url(post) {
	return post.url;
}

export function embed(post) {
	var embed = new EmbedBuilder();
	var actionRow = new ActionRowBuilder();
	embed = embed.setDescription(post.allTags.join(", ").replaceAll("_", " "))
		.setTitle(`#${post.id}`)
		.setImage(post.sample.url)
		.setURL(post.url);
	actionRow.addComponents([
		Buttons.new_random_post.component,
		Buttons.delete_message.component,
		Buttons.tags.component
	]);
	return {embeds: [embed], components: [actionRow]};
}
