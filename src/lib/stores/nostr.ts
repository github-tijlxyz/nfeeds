import { readable, writable, type Writable } from 'svelte/store';
import { SimplePool, type Event, type NostrEvent } from 'nostr-tools';

export const pubkey: Writable<string> = writable('');
export const lists: Writable<Map<string, string[]>> = writable(new Map());
export const readRelays: Writable<string[]> = writable([]);
export const writeRelays: Writable<string[]> = writable([]);

export const pool = readable(new SimplePool());

export const feedEvents: Writable<Map<string, NostrEvent[]>> = writable(new Map());

export const usersRelaysCache: Writable<Map<string, string[]>> = writable(new Map());
export const usersMetadataCache: Writable<Map<string, Event>> = writable(new Map());
