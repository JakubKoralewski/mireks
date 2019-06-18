import test from "ava";
import services from "./services";

test("Services all have IDs increasing by 1 starting at 0", async t => {
	let currentID = 0;
	for (const service of services) {
		t.is(
			service.id,
			currentID,
			`Service IDs are not correct ${
				service.id
			} should probably be ${service.id + 1}!`
		);
		currentID++;
	}
});

// const printBadService = (id) => {}

test("Services' titles should not end with punctuation", async t => {
	for (const service of services) {
		const lastCharacter = service.title.slice(-1);
		const regexMatch = lastCharacter.match(/[A-Zążęłńćóźś]/i);
		t.false(
			[",", ".", "!", "?"].includes(lastCharacter) || !regexMatch,
			`Service with id "${service.id}" title is: "${
				service.title
			}"\nThere may have been a dot: ${regexMatch}.`
		);
	}
});
test("Services' descriptions should end with a dot/exclamation/question (mark)", async t => {
	for (const service of services) {
		const lastCharacter = service.description.slice(-1);
		const regexMatch = lastCharacter.match(/[A-Zążęłńćóźś]/i);
		t.true(
			[".", "?", "!"].includes(lastCharacter) && !regexMatch,
			`Service with id "${service.id}" description is "${
				service.description
			}"\n It doesn't end with punctuation!`
		);
	}
});
