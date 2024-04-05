"use strict";

import axios from "axios";
import { Tags } from "./tagManager.js";

const rateLimitDelay = 500; // Delay in milliseconds

async function get(url) {
    try {
        const response = await axios.get(url, {
            headers: { "User-Agent": process.env['E6UserAgent'] }
        });
        await new Promise(resolve => setTimeout(resolve, rateLimitDelay));
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export async function getRandomPost(tags) {
    if (!(tags instanceof Tags)) {
        tags = new Tags(tags);
    }

    try {
        const response = await get(`https://e621.net/posts/random.json?tags=${tags.string}`);

        if (!response || response.status !== 200) {
            throw new Error('No response from the server or the status is not OK');
        }

        const data = response.data;

        if (data.success) {
            throw new Error('The API returned an error');
        }

        return new Post(data.post, `https://e621.net/posts/${data.post.id}.json?tags=${tags.string}`, "/posts/random");
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export class Post {
    constructor(post, url, methodCall) {
        Object.assign(this, post);
        this.url = url.replace(".json", "");
        this.methodCall = methodCall;
    }

    get allTags() {
        return [...Object.values(this.tags)].flatMap(tag => tag).sort();
    }
}
