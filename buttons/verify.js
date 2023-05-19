import * as Persistence from "../src/persistence/dataManager.js";
import {ButtonBuilder} from "discord.js";

export async function run(button) {
	if (Persistence.verify(button.user))
	return button.reply({content: "sorry for talking like that, can't be too careful when it comes to the legal system\n"
		+ "anyways you're verified now", ephemeral: true});
	else return button.reply({content: "looks like you already verified", ephemeral: true})
}

export const component = new ButtonBuilder().setCustomId("verify")
	.setStyle(3).setLabel("Accept")

/* new Discord.ButtonBuilder().setCustomId("verify")
	.setStyle(3).setLabel("Accept")*/
