import type { Event } from 'nostr-tools';

export function isReply(event: Event): boolean {
	if (!event.tags.some(([tagName]) => tagName === 'p')) {
		return false;
	}

	if (
		event.kind === 42 &&
		!event.tags.some(([tagName, , , marker]) => tagName === 'e' && marker !== 'root')
	) {
		return false;
	}

	return event.tags.some(
		([tagName, , , marker]) =>
			tagName === 'e' && (marker === 'reply' || marker === 'root' || marker === undefined)
	);
}

export function findIdentifier(tags: string[][]): string | undefined {
	const tag = tags.find(([name]) => name === 'd');
	if (tag === undefined) {
		return undefined;
	}
	return tag.at(1) ?? '';
}

export function parseRelayJson(content: string): Map<string, { read: boolean; write: boolean }> {
	const relays = new Map<string, { read: boolean; write: boolean }>(
		Object.entries(JSON.parse(content))
	);
	return new Map(
		[...relays].filter(([relay]) => {
			try {
				const url = new URL(relay);
				return url.protocol === 'wss:' || url.protocol === 'ws:';
			} catch {
				return false;
			}
		})
	);
}

export function aTagContent(event: Event): string {
	return `${event.kind}:${event.pubkey}:${findIdentifier(event.tags) ?? ''}`;
}
