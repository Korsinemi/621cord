import * as Discord from "discord.js";
import * as Persistence from "../../src/persistence/dataManager.js";
import * as Buttons from "../../buttons/.buttons.js"

export async function run(command) {
	if (!command.isRepliable()) return;
	if (Persistence.canUse(command.user)) return command.reply({content: "but you're already verified..", ephemeral: true});
	return command.reply({content: "In order to use this bot, you must verify you are over the age of 18 and agree to the Terms of Service by clicking `Accept` below.", ephemeral: true, components: [
		new Discord.ActionRowBuilder().addComponents([
			Buttons.verify.component,
			Buttons.terms_of_service.component,
			Buttons.privacy_policy.component
		])
	]});
}

export const details = {
	name: "verify",
	description: "enable your use of the bot",
	type: Discord.ApplicationCommandType.ChatInput,
	options: []
};
