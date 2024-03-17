<script lang="ts">
	import '@/lib/styles/markdown.css';
	import { pool, readRelays } from '@/lib/stores/nostr';
	import { getBasicFieldContent, type Feed } from '@/lib/feed';
	import * as Card from '@/lib/components/ui/card';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import UserProfile from './UserProfile.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { writable, type Writable } from 'svelte/store';
	import { AspectRatio } from './ui/aspect-ratio';
	import { nip19, type Event, type NostrEvent } from 'nostr-tools';
	import { Badge } from '$lib/components/ui/badge';
	import FieldContent from './FieldContent.svelte';
	import { defaultPostUrl } from '../stores/feeds';

	export let feed: Feed;

	const events: Writable<NostrEvent[]> = writable([]);

	$pool.subscribeMany($readRelays, [...feed.filters], {
		onevent: (nostrEvent: NostrEvent) => {
			const event = nostrEvent as Event;
			const existingEvents = $events || [];
			const isDuplicate = existingEvents.some((existingEvent) => existingEvent.id === event.id);

			if (!isDuplicate) {
				//events.set([event, ...existingEvents]);
				events.set([...existingEvents, event]);
			}
		}
	});

	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

{#if events}
	{#each $events as e (e.id)}
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<Card.Root class="mb-2 p-0 py-2">
					<Card.Header class="pb-3 pl-5 pt-4">
						{#if feed.fields.title}
							<a href={`${feed.name}/id/${e.id}`}>
								<Card.Title
									class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
								>
									<FieldContent field={feed.fields.title} event={e} />
								</Card.Title>
							</a>
						{/if}
						<div class="py-1">
							<UserProfile {feed} pubkey={e.pubkey} />
						</div>
						{#if feed.fields.tags}
							<div class="relative overflow-hidden">
								<div class="flex max-h-6 gap-2 overflow-hidden">
									{#each feed.fields.tags as a}
										{#each e?.tags as t}
											{#if t[0] == a.tag}
												<Badge href={`/${feed.name}/tag/${t[0]}/${t[1]}`}>{t[1]}</Badge>
											{/if}
										{/each}
									{/each}
								</div>
							</div>
						{/if}
					</Card.Header>
					<Card.Content class="overflow-hidden">
						{#if feed.fields.content}
							<a href={`/${feed.name}/id/${e.id}`}>
								{#if feed.options?.markdown == true}
									<div id="md-wrapper" class="prose">
										<SvelteMarkdown source={getBasicFieldContent(feed.fields.content, e)} />
									</div>
								{:else}
									<FieldContent field={feed.fields.content} event={e} />
								{/if}
							</a>
						{/if}
						{#if feed.fields.picture}
							{#if getBasicFieldContent(feed.fields.picture, e) != ''}
								<a href={`/${feed.name}/id/${e.id}`}>
									<AspectRatio ratio={16 / 9} class="bg-muted">
										<img
											class="h-full w-full rounded-md object-cover"
											src={getBasicFieldContent(feed.fields.picture, e)}
											alt=""
										/>
									</AspectRatio>
								</a>
							{/if}
						{/if}
					</Card.Content>
				</Card.Root>
			</ContextMenu.Trigger>
			<ContextMenu.Content class="w-64">
				<ContextMenu.Item
					href={(feed.options?.postUrl || defaultPostUrl).replace('{}', nip19.neventEncode(e))}
					inset
				>
					open
				</ContextMenu.Item>
				<ContextMenu.Item on:click={() => copy(nip19.npubEncode(e?.pubkey))} inset>
					copy author npub
				</ContextMenu.Item>
				<ContextMenu.Item on:click={() => copy(JSON.stringify(e))} inset>
					copy event json
				</ContextMenu.Item>
				<ContextMenu.Item on:click={() => copy(e?.id)} inset>copy event id hex</ContextMenu.Item>
				<ContextMenu.Item inset on:click={() => copy(nip19.neventEncode(e))}>
					copy nevent
				</ContextMenu.Item>
			</ContextMenu.Content>
		</ContextMenu.Root>
	{/each}
{/if}
