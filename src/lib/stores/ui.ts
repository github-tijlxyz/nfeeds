import { writable, type Writable } from 'svelte/store';

export const builder: Writable<Builder> = writable({ view: 'list' });

export type Builder = {
	view: 'list' | 'editor';
	data?: string;
};
