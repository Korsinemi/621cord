import * as Commands from "../commands/.commands.js";
import {ButtonBuilder} from "discord.js";

export async function run(button) {
	return Commands.ChatInput.privacy.run(button);
}

export const component = new ButtonBuilder().setCustomId("privacy_policy")
	.setStyle(1).setLabel("Read Privacy Policy")
