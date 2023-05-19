import {ButtonBuilder} from "discord.js";
import * as Modals from "../modals/.modals.js";
import {Tags} from "../src/tagManager.js";

export async function run(button) {
	// revamp to use a modal for the person who ran it
	if (button.user.id != button.message.interaction.user.id) {
		let tags = Tags.fromURL(button.message.embeds[0].url);
		return button.reply({content: `Tags: \`${tags.strList}\``, ephemeral: true});
	} // else
	return button.showModal(Modals.edit_tags.construct(button));
}

export const component = new ButtonBuilder().setCustomId("tags").setEmoji("🏷️").setStyle(1);
