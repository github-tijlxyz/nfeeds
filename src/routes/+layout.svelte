<script>
	import { ModeWatcher } from 'mode-watcher';
	import '../app.pcss';
	import { onMount } from 'svelte';
	import { Signer } from '@/lib/nostr/signer';
	import { readRelays } from '@/lib/stores/nostr';
	import { get } from 'svelte/store';

	let loading = true;

	onMount(async () => {
		// just do nip07 for now
		localStorage.setItem('nostr-login', 'NIP07');

		// save basic info
		const pubkey = await Signer.getPublicKey();
		/*const relays = await Signer.getRelays();

        const a = get(readRelays);

        for (const [k, v] of Object.entries(relays)) {
            if (v.read == true) {
                readRelays.set([k, ...a])
            }
        }*/
		readRelays.set(['wss://relay.tijl.xyz', 'wss://nostr.mom']);

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
