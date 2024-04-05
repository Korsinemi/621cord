"use strict";

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder } from "discord.js";
import * as Buttons from "../buttons/.buttons.js"

export function url(post) {
    return post.url;
}

console.log

export function embed(post) {
    if (post === false) {
        return { content: "I didn't find anything with those search terms." };
    }

    var embed = new EmbedBuilder();
    var actionRow = new ActionRowBuilder();

    var rating;
    switch (post.rating) {
        case "s":
            rating = "SAFE 😺";
            break;
        case "e":
            rating = "EXPLICIT ❤️";
            break;
        case "q":
            rating = "QUESTIONABLE 🔞";
            break;
        default:
            rating = "UNKNOWN";
    }

    var description
    if (post.description === "") {
        description = "No description"
    } else {
        description = post.description
    }

    embed = embed.setDescription(`
        **Artist**: ${post.tags.artist.join(", ").replaceAll("_", " ")}
        ------------
        **Rating**: ${rating}
        **Scores:** ✅ Up: **${post.score.up}** 
                    ❎ Down: **${post.score.down}** 
                    🦊 Total: **${post.score.total}**
        ------------
        **Description:** 
        \`\`\`${description}\`\`\`
        ------------
        **Tags**
        \`\`\`${post.allTags.join(", ").replaceAll("_", " ")}\`\`\`
        `)
        .setTitle(`Scrapped from e621 > #${post.id}`)
        .setURL(post.url)
        .setFooter({ text: `⭐ Favorited ${post.fav_count} times | 621cord by Korsinemi (reubuilded from susse6)`, iconURL: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQPDWhYX8_2HxocQsPiQkT7M5wwCWOCAqmkciBsyhkgA&s" });

    var videoUrl;
    if (["webm", "mp4"].includes(post.file.ext)) {
        videoUrl = post.file.url;
    } else if (["swf"].includes(post.file.ext)) {
        embed.setImage("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9s92w2c8f5hNU3zEVxCv9dGrYLeh2qTeZ-tPt29wWXw&s")
    } else {
        embed.setImage(post.sample.url);
    }

    actionRow.addComponents([
        Buttons.new_random_post.component,
        Buttons.delete_message.component,
        Buttons.tags.component
    ]);


    var response = { embeds: [embed], components: [actionRow], files: [] };
    if (videoUrl) {
        response = { embeds: [embed], components: [actionRow], files: [videoUrl] };
    }
    return response;

}

