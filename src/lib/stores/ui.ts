import { writable, type Writable } from 'svelte/store';
import type { Feed } from '../feed';

export const builder: Writable<Builder> = writable({ view: 'list' });

export type Builder = {
	view: 'list' | 'editor';
	data?: string;
};

export const selectedFeed: Writable<Feed | null> = writable(null);
