import { type Writable, writable } from 'svelte/store';
import { type Feed } from '@/lib/types';

type FeedsStorage = {
	[key: string]: Feed;
};

export const feeds: Writable<FeedsStorage> = writable({});

const o = localStorage.getItem('feeds');
if (o !== null && o !== '') {
	const b = JSON.parse(o);
	feeds.set(b);
} else {
	feeds.set({
		notes: {
			id: 'notes',
			fields: {
				content: 'content',
				tags: { key: 't' }
			},
			filters: [
				{
					kinds: [1],
					limit: 5
				}
			]
		},
		cooking: {
			id: 'cooking',
			fields: {
				title: { key: 'title' },
				picture: { key: 'image' },
				tags: { key: 't' },
				content: { key: 'summary' }
			},
			filters: [
				{
					kinds: [30023],
					'#t': ['nostrcooking'],
					limit: 5
				}
			],
			options: {
				markdown: true
			}
		},
		wiki: {
			id: 'wiki',
			fields: {
				title: { key: 'd' },
				tags: { key: 't' },
				content: 'content'
			},
			filters: [
				{
					kinds: [30818],
					limit: 5
				}
			],
			options: {
				markdown: true
			}
		}
	});
}

feeds.subscribe((aa) => {
	localStorage.setItem('feeds', JSON.stringify(aa));
});
