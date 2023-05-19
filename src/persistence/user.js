import {Tags} from "../tagManager.js";

export class UserModel {
	constructor(prefsObject) {
		this.DMPrefs = new Tags(prefsObject.DM);
		this.SFWPrefs = new Tags(prefsObject.SFW);
		this.NSFWPrefs = new Tags(prefsObject.NSFW);
	}
	changeDMPrefs(tagStr) {
		this.DMPrefs.add(tagStr);
		return this;
	}
	changeSFWPrefs(tagStr) {
		// require "rating:s -rating:q -rating:e"
		this.SFWPrefs.add(tagStr, " rating:s -rating:q -rating:e");
		return this;
	}
	changeNSFWPrefs(tagStr) {
		// require "-child"
		this.NSFWPrefs.add(tagStr, " -child");
		return this;
	}
	object() {
		console.log(this.NSFWPrefs.strList);
		return {
			DM: this.DMPrefs.strList,
			SFW: this.SFWPrefs.strList,
			NSFW: this.NSFWPrefs.strList
		};
	}
	toJSON() {
		return JSON.stringify(this.object, "\t");
	}
}
