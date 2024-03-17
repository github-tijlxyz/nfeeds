import { readable, writable, type Writable } from 'svelte/store';
import { SimplePool, type Event, type NostrEvent } from 'nostr-tools';

//export const pubkey: Writable<string> = writable('');
//export const lists: Writable<Map<string, string[]>> = writable(new Map());
export const readRelays: Writable<string[]> = writable([
	'wss://nostr.wine',
	'wss://pyramid.fiatjaf.com',
	'wss://relay.tijl.xyz'
]);
const savedreadrelays = localStorage.getItem('readRelays');
if (savedreadrelays != null) {
	let b: string[] | undefined;
	try {
		b = JSON.parse(savedreadrelays);
	} catch (err) {
		console.log(err);
	}
	if (b) {
		readRelays.set(b);
	}
}
readRelays.subscribe((a) => {
	localStorage.setItem('readRelays', JSON.stringify(a));
});

export const pool = readable(new SimplePool());

export const feedEvents: Writable<Map<string, NostrEvent[]>> = writable(new Map());

export const usersRelaysCache: Writable<Map<string, string[]>> = writable(new Map());
export const usersMetadataCache: Writable<Map<string, Event>> = writable(new Map());
