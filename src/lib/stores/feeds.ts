import { type Writable, writable } from 'svelte/store';
import { type Feed } from '@/lib/feed';

export const defaultUserUrl = 'https://njump.me/{}';
export const defaultPostUrl = 'https://njump.me/{}';

export const feeds: Writable<Feed[]> = writable([]);

const o = localStorage.getItem('feeds');
if (o !== null && o !== '') {
	const b = JSON.parse(o);
	feeds.set(b);
} else {
	feeds.set([
		{
			name: 'notes',
			fields: {
				content: ['content'],
				tags: [{ tag: 't' }]
			},
			filters: [
				{
					kinds: [1],
					limit: 12
				}
			]
		},
		{
			name: 'Long-form Content',
			filters: [
				{
					kinds: [30023],
					limit: 12
				}
			],
			fields: {
				title: [{ tag: 'title' }],
				content: [{ tag: 'summary' }, 'content'],
				picture: [{ tag: 'image' }],
				tags: [{ tag: 't' }]
			},
			options: {
				markdown: true
			}
		},

		{
			name: 'cooking',
			fields: {
				title: [{ tag: 'title' }],
				picture: [{ tag: 'image' }],
				tags: [{ tag: 't' }],
				content: [{ tag: 'summary' }]
			},
			filters: [
				{
					kinds: [30023],
					'#t': ['nostrcooking'],
					limit: 12
				}
			],
			options: {
				markdown: true
			}
		},
		{
			name: 'wiki',
			fields: {
				title: [{ tag: 'title' }, { tag: 'd' }],
				tags: [{ tag: 't' }],
				content: [{ tag: 'summary' }, 'content']
			},
			filters: [
				{
					kinds: [30818],
					limit: 12
				}
			],
			options: {
				markdown: true
			}
		}
	]);
}

feeds.subscribe((aa) => {
	localStorage.setItem('feeds', JSON.stringify(aa));
});
