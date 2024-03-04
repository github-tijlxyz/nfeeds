import type { Filter } from 'nostr-tools';

export type Feed = {
	id: string;
	filters: Filter[];
	fields: FeedFields;
	relays?: string[];
	options?: {
		markdown: boolean;
	};
};

export type FeedFields = {
	title?: FieldOptions;
	content?: FieldOptions;
	picture?: FieldOptions;
	tags?: FieldOptionsTagOptions;
};

export type FieldOptions = FieldOptionsTagOptions | 'content' | 'kind';
export type FieldOptionsTagOptions = {
	key: string;
};
