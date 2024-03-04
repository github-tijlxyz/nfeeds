<script lang="ts">
	import * as Select from '@/lib/components/ui/select';
	import type { Feed } from '@/lib/types';
	import { feeds } from '@/lib/stores/feeds';
	import FeedComponent from '@/lib/components/Feed.svelte';
	import { Button } from '@/lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import Builder from '@/lib/components/Builder.svelte';

	feeds.subscribe((a) => {
		console.log(a);
	});

	let selectedFeed: Feed | null = null;
</script>

<div class="mb-2 mt-2 flex gap-1">
	<Select.Root portal={null}>
		<Select.Trigger class="w-full">
			<Select.Value placeholder="Select a feed" />
		</Select.Trigger>
		<Select.Content>
			<Select.Group>
				{#each Object.values($feeds) as item}
					<Select.Item on:click={() => (selectedFeed = item)} value={item.id}>{item.id}</Select.Item
					>
				{/each}
			</Select.Group>
		</Select.Content>
		<Select.Input name="feed" />
	</Select.Root>
	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline">Relays</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="mx-auto w-full max-w-sm">Soon(tm)</div>
		</Drawer.Content>
	</Drawer.Root>
	<Drawer.Root>
		<Drawer.Trigger asChild let:builder>
			<Button builders={[builder]}>Builder</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<div class="mx-auto w-full max-w-sm">
				<Builder />
			</div>
		</Drawer.Content>
	</Drawer.Root>
</div>

<div id="feed" class="lg:mx-[16.6667%]">
	{#if selectedFeed}
		<FeedComponent feed={selectedFeed} />
	{/if}
</div>
