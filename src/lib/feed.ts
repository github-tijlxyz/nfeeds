import { type NostrEvent } from 'nostr-tools';
import type { Filter } from 'nostr-tools';

export type Feed = {
	name: string;
	filters: Filter[];
	fields: FeedFields;
	options?: {
		markdown?: boolean;
		// below not used anymore?
		userUrl?: string;
		postUrl?: string;
	};
};

export type FeedFields = {
	title?: FieldOptions[];
	content?: FieldOptions[];
	picture?: FieldOptions[];
	tags?: { tag: string }[];
};

export type FieldOptions = { tag: string } | 'content';

export function getBasicFieldContent(field: FieldOptions[], event: NostrEvent): string {
	let content = '';
	field.forEach((c) => {
		if (content == '') {
			if (typeof c == 'string') {
				if (c == 'content') {
					content = event.content;
				}
			} else if (c.tag) {
				const d = event.tags.find((a) => a[0] == c.tag)?.[1];
				if (d) {
					content = d;
				}
			}
		}
	});
	return content;
}
