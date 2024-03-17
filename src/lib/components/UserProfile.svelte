<script lang="ts">
	import { writable } from 'svelte/store';
	import * as Avatar from '@/lib/components/ui/avatar';
	import { getMetadata, type MetadataType } from '@/lib/nostr/metadata';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { onMount } from 'svelte';
	import { nip19 } from 'nostr-tools';
	import { defaultUserUrl } from '@/lib/stores/feeds';
	import type { Feed } from '../feed';

	export let pubkey: string;
	export let feed: Feed;
	let npub = nip19.npubEncode(pubkey);

	let metadata = writable<MetadataType | null>(null);
	let isLoading = writable(true);

	onMount(async () => {
		isLoading.set(true);
		getMetadata(pubkey).then((data) => {
			metadata.set(data);
			isLoading.set(false);
		});
	});

	// let showNpub = false;
</script>

<div>
	{#if $isLoading}
		<div class="flex items-center space-x-4">
			<Skeleton class="h-10 w-10 rounded-full" />
			<div class="space-y-2">
				<Skeleton class="h-4 w-16" />
			</div>
		</div>
	{:else if $metadata}
		<a href={`/${feed.name}/author/${pubkey}`} class="flex items-center space-x-4">
			<Avatar.Root>
				<Avatar.Image src={$metadata.picture} alt={$metadata.name} />
				<Avatar.Fallback>{$metadata.name?.substring(0, 2)?.toUpperCase()}</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex items-center font-medium">{$metadata.display_name || $metadata.name}</div>
		</a>
	{/if}
</div>
