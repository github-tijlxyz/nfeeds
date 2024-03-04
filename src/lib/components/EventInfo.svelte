<script>
	import { nip19 } from 'nostr-tools';

	export let feed;
	export let event;

	const nevent = nip19.neventEncode(event);
</script>
