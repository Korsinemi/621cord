"use strict";

import fetch from "node-fetch";
import {Tags} from "./tagManager.js";
import {E6UserAgent} from "../../tokens/SussE6.js";
import {Mutex} from "async-mutex";
/*
var ret = await fetch(`${url}`, {
  method: "GET",
  headers: {
    "User-Agent": "SussE6 Discord Bot (by arden_arteles on e621)"
  }
});*/

var rateLimit = new Mutex();

// doesn't use await but always returns a promise
async function get(url) {
    if (rateLimit.isLocked())
      console.log("Rate limit locked, waiting to complete request...");
    return rateLimit.acquire().then(release => {

        let tempValue = fetch(url, {method: "GET", headers: {"User-Agent": E6UserAgent}});

        return tempValue.then(ret => {
            setTimeout(() => release(), 500);
            return ret;
        });
    });
}

export async function getRandomPost(tags) {
    if (!(tags instanceof Tags))
      tags = new Tags(tags);
    var a = get(`https://e621.net/posts/random.json?tags=${tags.string}`)
        .then(res => res.json());
    return a.then(data => new Post(data.post, `https://e621.net/posts/${data.post.id}.json?tags=${tags.string}`, "/posts/random"));
}

export class Post {
    constructor(post, url, methodCall) {
        Object.assign(this, post);
        this.url = url.replace(".json","");
        this.methodCall = methodCall;
    }
    get allTags() {
        return [...Object.values(this.tags)].flatMap(tag => tag).sort();
    }
}
