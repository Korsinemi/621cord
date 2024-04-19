"use strict";

import { Client, GatewayIntentBits, Partials } from 'discord.js';
import * as Persistence from "./src/persistence/dataManager.js";

import * as Commands from "./commands/.commands.js";
import * as Buttons from "./buttons/.buttons.js";
import * as Modals from "./modals/.modals.js";

import { config } from 'dotenv';
config();

const client = new Client({
    intents: Object.values(GatewayIntentBits),
    partials: Object.values(Partials).map((partial) => partial),
    allowedMentions: {
        repliedUser: true,
    },
    restRequestTimeout: 20000
});

client.on("interactionCreate", async (interaction) => {
    if (interaction.isChatInputCommand())
        return handleChatInputCommand(interaction);
    if (interaction.isButton())
        return handleButton(interaction);
    if (interaction.isModalSubmit())
        return handleModal(interaction);
});

async function handleChatInputCommand(command) {
    if (!Persistence.canUse(command.user))
        return Commands.ChatInput.verify.run(command);
    return Commands.ChatInput[command.commandName].run(command);
}
async function handleButton(button) {
    return Buttons[button.customId].run(button);
}
async function handleModal(modal) {
    return Modals[modal.customId].run(modal);
}


client.on("ready", () => {
    console.log("Ready...");
});

client.login(process.env['TOKEN_DISCORD'])
