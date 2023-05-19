export async function run(autocomplete) {
	autocomplete.respond([{
		name: "tags",
		value: "tags"
	},{
		name: "help",
		value: "help"
	},{
		name: "random",
		value: "random"
	},{
		name: "prefs",
		value: "prefs"
	}]);
}
