import { get } from 'svelte/store';
import { usersMetadataCache, pool, readRelays, usersRelaysCache } from '@/lib/stores/nostr';

export type MetadataType = {
	[key: string]: string;
};

export async function getMetadata(pubkey: string): Promise<MetadataType> {
	const cached = get(usersMetadataCache).get(pubkey);
	if (cached) {
		return JSON.parse(cached.content);
	} else {
		const r = await get(pool).get(get(readRelays), { kinds: [10002], limit: 1, authors: [pubkey] });
		let n: string[] = [];
		if (r) {
			r.tags.forEach((a) => {
				if (a[0] == 'r' && a[1]) {
					n.push(a[1]);
				}
			});
			usersRelaysCache.set(get(usersRelaysCache).set(pubkey, n));
		} else {
			n = get(readRelays);
		}
		n = n.slice(0, 3);
		const e = await get(pool).get(n, { kinds: [0], authors: [pubkey] });
		if (e) {
			usersMetadataCache.set(get(usersMetadataCache).set(pubkey, e));
			const a = JSON.parse(e.content);
			return a;
		} else {
			return { name: 'not found' };
		}
	}
}
