<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import Feed from '@/lib/components/Feed.svelte';
	import { feeds } from '@/lib/stores/feeds';
	import { selectedFeed } from '@/lib/stores/ui';
	import { onMount } from 'svelte';

	page.subscribe(async (z) => {
		const pathname = z.url.pathname;
		const components = pathname.split('/').filter((component) => component !== '');
		const b = $selectedFeed;
		if (b && components[1] && components[2]) {
			b.filters.forEach((a, i) => {
				let c = a;
				if (components[1] == 'author') {
					if (!c.authors) {
						c.authors = [];
					}
					c.authors.push(components[2]);
				}
				if (components[1] == 'id') {
					if (!c.ids) {
						c.ids = [];
					}
					c.ids.push(components[2]);
				}
				//if (components[1] == 'tag') { if (!c.`#${components[2]}`) { c.`#${components[2]}` = [] } c.`#${components[2]}`.push(components[3]) }
				b.filters[i] = c;
			});
			selectedFeed.set(null);
			console.log('b', b);
			setTimeout(() => {
				selectedFeed.set(b);
			}, 50);
		} else if (components[0]) {
			const foundFeed = $feeds.find((a) => a.name == components[0]);
			if (foundFeed) {
				selectedFeed.set(null);
				setTimeout(() => {
					selectedFeed.set(foundFeed);
				}, 50);
			}
		}
	});
</script>
