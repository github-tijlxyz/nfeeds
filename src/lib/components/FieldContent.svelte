<script lang="ts">
	import type { NostrEvent } from 'nostr-tools';
	import { getBasicFieldContent, type FieldOptions } from '@/lib/feed';

	export let field: FieldOptions[];
	export let event: NostrEvent;

	let content = getBasicFieldContent(field, event);

	console.log([field, event, content]);
</script>

{content}
