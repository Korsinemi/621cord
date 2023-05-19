import * as Commands from "../commands/.commands.js";
import {ButtonBuilder} from "discord.js"

export async function run(button) {
	return Commands.ChatInput.terms.run(button);
}

export const component = new ButtonBuilder().setCustomId("terms_of_service")
	.setStyle(1).setLabel("Read Terms of Service")
