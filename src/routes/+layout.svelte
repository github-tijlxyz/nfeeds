<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { onMount } from 'svelte';
	import * as Select from '@/lib/components/ui/select';
	import { feeds } from '@/lib/stores/feeds';
	import { selectedFeed } from '@/lib/stores/ui';
	import FeedComponent from '@/lib/components/Feed.svelte';
	import { Button } from '@/lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
	import Builder from '@/lib/components/Builder.svelte';
	import Relays from '@/lib/components/Relays.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	feeds.subscribe((a) => {
		console.log(a);
	});

	let loading = true;
	let dismissmsg = false;

	onMount(async () => {
		const pathname = $page.url.pathname;
		const components = pathname.split('/').filter((component) => component !== '');
		const foundFeed = $feeds.find((a) => a.name == components[0]);
		if (foundFeed) {
			selectedFeed.set(foundFeed);
		}
		console.log('c', components);
		loading = false;
	});
</script>

<ModeWatcher />
<div class="mx-2">
	{#if !localStorage.getItem('dismiss-msg-0')}
		<div on:click={() => localStorage.setItem('dismiss-msg-0', 'true')}>WIP</div>
	{/if}
	{#if loading}
		<div>A moment please...</div>
	{:else}
		<slot />
		<div class="mb-2 mt-2 flex gap-1">
			<Select.Root portal={null}>
				<Select.Trigger class="w-full">
					<Select.Value placeholder="Select a feed" />
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						{#each $feeds as item}
							<Select.Item
								on:click={() => {
									goto(`/${item.name}/`);
								}}
								value={item.name}>{item.name}</Select.Item
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
					<div class="mx-auto w-full max-w-sm">
						<Relays />
					</div>
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
			{#if $selectedFeed}
				{#each [$selectedFeed] as s (s.name)}
					<FeedComponent feed={s} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
