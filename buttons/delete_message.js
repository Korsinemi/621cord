import {ButtonBuilder} from "discord.js";

export async function run(button) {
	return button.deferUpdate().then(() => button.deleteReply());
}

export const component = new ButtonBuilder().setCustomId("delete_message").setEmoji("🗑️").setStyle(4);
