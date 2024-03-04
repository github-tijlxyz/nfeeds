<script lang="ts">
	import '@/lib/styles/markdown.css';
	import { Timeline } from '@/lib/feed';
	import { feedEvents } from '@/lib/stores/nostr';
	import { type Feed, type FieldTagOptions } from '@/lib/types';
	import * as Card from '@/lib/components/ui/card';
	import * as ContextMenu from '$lib/components/ui/context-menu';
	import UserProfile from './UserProfile.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { AspectRatio } from './ui/aspect-ratio';
	import { nip19, type Event } from 'nostr-tools';
	import { Badge } from '$lib/components/ui/badge';

	export let feed: Feed;

	const a = writable<Timeline | null>(null);
	$: {
		a.set(new Timeline(feed));
	}

	function copy(text: string) {
		navigator.clipboard.writeText(text);
	}
</script>

{#if $feedEvents.get(feed)}
	{#each $feedEvents.get(feed) as e (e.id)}
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<Card.Root class="mb-2 p-0 py-2">
					<Card.Header class="pb-3 pl-5 pt-4">
						{#if feed.fields.title}
							<Card.Title
								class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
							>
								{#if feed.fields.title == 'content'}{e?.content}{/if}
								{#if feed.fields.title == 'kind'}{e?.kind}{/if}
								{#if typeof feed.fields.title != 'string'}{e?.tags.find(
										(a) => a[0] == feed.fields.title.key
									)?.[1]}{/if}
							</Card.Title>
						{/if}
						<!-- future fields? <Card.Description></Card.Description> -->
						<div class="py-1">
							<UserProfile pubkey={e.pubkey} />
						</div>

						{#if feed.fields.tags}
							<div class="relative overflow-hidden">
								<div class="flex max-h-6 gap-2 overflow-hidden">
									{#each e?.tags as t}
										{#if t[0] == feed.fields.tags.key}
											<Badge>{t[1]}</Badge>
										{/if}
									{/each}
								</div>
							</div>
						{/if}
					</Card.Header>
					<Card.Content class="overflow-hidden">
						{#if feed.fields.content == 'content'}
							{#if feed.options?.markdown}
								<div id="md-wrapper" class="prose">
									<SvelteMarkdown source={e?.content} />
								</div>
							{:else}
								{e?.content}
							{/if}
						{/if}
						{#if typeof feed.fields.content != 'string'}{e?.tags.find(
								(a) => a[0] == feed.fields.content.key
							)?.[1]}{/if}

						{#if feed.fields.picture && typeof feed.fields.picture != 'string'}
							<AspectRatio ratio={16 / 9} class="bg-muted">
								<img
									class="h-full w-full rounded-md object-cover"
									src={e?.tags.find((a) => a[0] == feed.fields.picture.key)?.[1]}
									alt=""
								/>
							</AspectRatio>
						{/if}
					</Card.Content>
				</Card.Root>
			</ContextMenu.Trigger>
			<ContextMenu.Content class="w-64">
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
