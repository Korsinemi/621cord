

// default include
// - exclude
// ~ ignore

// TODO: Wildcard tags (?)

export class Tags {
	static fromURL(url) {
		return new Tags(url.match(/(?<=(?:(?:\?|&)tags=))[^&]*/));
	}
	constructor(tags) { // public
		this.included = new Set();
		this.excluded = new Set();
		if (tags instanceof Tags) {
			tags = tags.tagList;
		}
		if (tags instanceof Set) {
			tags = tags.values();
		}
		if (typeof tags == "string") {
			tags = tags.split(/[ \+]+/);
		}
		if (tags instanceof Array) {
			this.add(...tags);
		}
	}
	include(tag) {
		if (!tag) return;

		this.included.add(tag);
		this.excluded.delete(tag);
	}
	exclude(tag) { // private "-tag"
		if (!tag) return;
		this.excluded.add(tag);
		this.included.delete(tag);
	}
	ignore(tag) { // private "~tag"
		if (!tag) return;
		this.included.delete(tag);
		this.excluded.delete(tag);
	}
	add(...tags) {
		// console.log(this);
		for (let tagValue of tags) {
			if (tagValue instanceof Tags) {tagValue = tagValue.tagList};
			if (tagValue instanceof Set) tagValue = [...tagValue.values()];
			if (tagValue instanceof Array) return tagValue.forEach(tag => this.add(tag));

			if ((tagValue = tagValue.split(/[ +]+/)).length > 1) return tagValue.forEach(tag => this.add(tag));
			if (tagValue.length == 1) {
				let tag = tagValue[0];
				if (tag.startsWith("-")) return this.exclude(tag.slice(1));
				if (tag.startsWith("~")) return this.ignore(tag.slice(1));

				return this.include(tag);
			}
		}
	}
	remove(...tags) {
		for (let tagValue of tags) {
			if (tagValue instanceof Set) tagValue = tagValue.values();
			if (tagValue instanceof Array) return tagValue.forEach(this.add);
			if ((tagValue = tagValue.split(/[ +]+/)).length > 1) return tagValue.forEach(this.add);
			if (tagValue.length == 1) {
				let tag = tagValue[0];
				if (tag.startsWith("-")) tag = tag.slice(1);
				this.ignore(tag);
			}
		}
	}
	get tagList() { // public
		return [...this.included.values()].concat([...this.excluded.values()].map(tag => "-" + tag));
	}
	get string() {
		return this.tagList.join("+");
	}
	get strList() {
		return this.tagList.join(" ");
	}
	toJSON() {
		return JSON.stringify(this.tagList);
	}
}
