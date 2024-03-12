<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { readRelays } from '@/lib/stores/nostr';

	let loading = true;

	onMount(async () => {
		readRelays.set(['wss://relay.tijl.xyz', 'wss://pyramid.fiatjaf.com', 'wss://nostr.wine']);

		loading = false;
	});
</script>

<ModeWatcher />
<div class="mx-2">
	{#if loading}
		<div>A moment please...</div>
	{:else}
		<slot />
	{/if}
</div>
