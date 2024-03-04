<script lang="ts">
	import { feeds } from '../stores/feeds';
	import { Button } from './ui/button';
	import { builder } from '../stores/ui';
	import Editor from './Editor.svelte';
</script>

<div class="px-2 py-4">
	{#if $builder.view == 'list'}
		<div>
			{#each Object.values($feeds) as feed}
				<Button
					class="mb-1 block w-full"
					size="sm"
					variant="outline"
					on:click={() => builder.set({ view: 'editor', data: feed.id })}>{feed.id}</Button
				>
			{/each}
			<Button
				on:click={() => builder.set({ view: 'editor', data: 'new' })}
				class="block w-full"
				variant="default"
				size="sm">new</Button
			>
		</div>
	{:else if $builder.view == 'editor'}
		<Button
			class="mb-1 block w-full"
			on:click={() => builder.set({ view: 'list' })}
			variant="outline">view list</Button
		>
		{#if $builder.data}
			<Editor feedId={$builder.data} />
		{/if}
	{/if}
</div>
