export async function sleep(ms) {
	return new Promise((res, rej) => setTimeout(() => res(), ms));
}

export function mapToJSON() {
	return JSON.stringify(Object.fromEntries([...this.entries()]));
}
