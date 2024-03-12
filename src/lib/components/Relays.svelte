<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { readRelays } from '../stores/nostr';
	import { Input } from '@/lib/components/ui/input';

	let newrelaything = '';

	async function getFromExtention() {
		const r = await window.nostr.getRelays();
		if (r) {
			const na = [];
			for (const a in r) {
				if (r[a].read == true) {
					na.push(a);
				}
			}
			readRelays.set(na);
		}
	}
</script>

<div class="mt-4 pb-4">
	<div>
		<div class="block">read relays</div>
		{#each $readRelays as r, i}
			<button
				on:click={() => {
					$readRelays.splice(i, 1);
					readRelays.set($readRelays);
				}}
				class="block hover:underline">{i + 1}: {r}</button
			>
		{/each}
	</div>

	<div class="inline">
		<Input bind:value={newrelaything}></Input>
		<Button
			on:click={() => {
				$readRelays.push(newrelaything);
				readRelays.set($readRelays);
			}}>add</Button
		>
	</div>

	<Button on:click={() => getFromExtention()} variant="outline">get from extention</Button>
</div>
