import { readable, writable, type Writable } from 'svelte/store';
import { SimplePool, type Event } from 'nostr-tools';
import type { Feed } from '../types';

export const pubkey: Writable<string> = writable('');
export const lists: Writable<Map<string, string[]>> = writable(new Map());
export const readRelays: Writable<string[]> = writable([]);
export const writeRelays: Writable<string[]> = writable([]);

export const pool = readable(new SimplePool());

export const feedEvents: Writable<Map<Feed, Event[]>> = writable(new Map());

export const usersRelaysCache: Writable<Map<string, string[]>> = writable(new Map());
export const usersMetadataCache: Writable<Map<string, Event>> = writable(new Map());
