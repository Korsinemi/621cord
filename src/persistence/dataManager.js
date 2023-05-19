import * as fs from "fs/promises";
import {Tags} from "../tagManager.js";
import {UserModel} from "./user.js"
import * as toolbox from "../toolbox.js";

// 3 categories -- safe, nsfw, DM
// safe has a MANDATORY rating:s present
// nsfw has a MANDATORY -young present
// DM has no mandatory tags but defaults to rating:s

// use a Map, JSON.stringify, and new Map ([...<Object>.entries()])

var usersTracker = await fs.readFile("./data/tags.json", {encoding: "utf-8"})
	.then(data => new Map(Object.entries(JSON.parse(data))));

usersTracker.toJSON = toolbox.mapToJSON.bind(usersTracker);

var permittedUsers = JSON.parse(await fs.readFile("./data/users.json"));

for (let [id, prefs] of usersTracker) {
	usersTracker.set(id, new UserModel(await prefs));
}

// [...usersTracker.values()].forEach(user => user.update());

const contextEnum = {true: "NSFW", false: "SFW", undefined: "DM", null: "DM"};
// console.log(usersTracker);
export async function getUserPrefs(user, context) {
	var userData = usersTracker.get(user) ?? usersTracker.set(user, new UserModel({DM: "rating:s", SFW: "rating:s -rating:q -rating:e", NSFW: "-child"})).get(user);
	var field = [contextEnum[context?.nsfw] + "Prefs"];
	// console.log(user); console.log(usersTracker.get(user)); console.log(field);
	// console.log(userData[field]);
	return userData[field];
}

export function canUse(user) {
	return permittedUsers.includes(user.id)
}

export async function verify(user) {
	if (!canUse(user)) {
		permittedUsers.push(user.id);
		return true;
	}
	return false;
}

export async function setUserPrefs(user, tags, context) {
	var userData = usersTracker.get(user) ?? usersTracker.set(user, new UserModel({DM: "", SFW: "rating:s", NSFW: "-child"})).get(user);
	var field = "change" + contextEnum[context?.nsfw] + "Prefs";
	// console.log(userData[field.slice(6)]);
	return userData[field](tags);
}

async function writePersistence() {
	console.log("Writing data...");
	var tempObj = {};
	for (let [key0, value0] of usersTracker.entries()) {
		tempObj[key0] = value0.object();
	}

	await Promise.all([
		fs.writeFile('./data/tags.json', JSON.stringify(tempObj, null, "\t")),
		fs.writeFile('./data/users.json', JSON.stringify(permittedUsers, null, "\t"))
	]).then(() => setTimeout(writePersistence, 900000));
}
setTimeout(writePersistence, 900000);
