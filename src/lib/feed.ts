import { feedEvents, pool, readRelays } from '@/lib/stores/nostr';
import { SimplePool, type NostrEvent, type Event } from 'nostr-tools';
import { get } from 'svelte/store';
import type { Feed } from './types';

export class Timeline {
	private readonly $pool: SimplePool;
	private readonly $readRelays: string[];
	private readonly feed: Feed;
	private readonly didSubscribe: boolean = false;

	constructor(feed: Feed) {
		this.$pool = get(pool);
		this.$readRelays = get(readRelays);
		this.feed = feed;

		const events = get(feedEvents);
		events.set(feed, []);
		feedEvents.set(events);

		if (this.didSubscribe == false) {
			this.didSubscribe = true;
			this.subscribe();
		}
	}

	private async subscribe(): Promise<() => void> {
		const subscribe = this.$pool.subscribeMany(this.$readRelays, this.feed.filters, {
			onevent: (nostrEvent: NostrEvent) => {
				const event = nostrEvent as Event;
				const events = get(feedEvents);
				const existingEvents = events.get(this.feed) || [];

				const isDuplicate = existingEvents.some((existingEvent) => existingEvent.id === event.id);

				if (!isDuplicate) {
					events.set(this.feed, [event, ...existingEvents]);
					feedEvents.set(events);
				}
			}
		});

		return () => {
			subscribe.close();
		};
	}

	public async more(): Promise<() => void> {
		return () => {};
	}
}
