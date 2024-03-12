<script lang="ts">
	// TODO
	import { feeds } from '../stores/feeds';
	import { Button } from './ui/button';
	import { type Feed } from '@/lib/feed';
	import { Textarea } from './ui/textarea';

	export let feedId: string;

	let existingFeed = $feeds.find((a) => a.name == feedId);

	let feed: string = JSON.stringify(
		{
			name: 'new',
			filters: [
				{
					kinds: [1],
					limit: 12
				}
			],
			fields: {}
		},
		null,
		2
	);
	if (existingFeed) {
		feed = JSON.stringify(existingFeed, null, 2);
	}

	function save() {
		const z = $feeds;
		const f: Feed = JSON.parse(feed);
		if (existingFeed) {
			const a = $feeds.findIndex((a) => a.name == feedId);
			if (a != -1) {
				console.log('updated');
				z[a] = f;
				feeds.set(z);
			}
		} else {
			console.log('updated');
			z.push(f);
			feeds.set(z);
		}
	}

	function del() {
		const z = $feeds;
		if (existingFeed) {
			const a = $feeds.findIndex((a) => a.name == feedId);
			if (a != -1) {
				z.splice(a, 1);
				feeds.set(z);
			}
		}
	}
</script>

<Textarea bind:value={feed}></Textarea>

<Button on:click={() => save()}>Save</Button>
<Button on:click={() => del()}>delete</Button>

<!--
TODO 
<div>
	<div>Fields: Content</div>
    <Tabs.Root> 
        <Tabs.List> 
            <Tabs.Trigger value="content">content</Tabs.Trigger>
            <Tabs.Trigger value="tag">tag</Tabs.Trigger>
        </Tabs.List> 
    </Tabs.Root>

</div>

<div>
	<div>Fields</div>
</div>-->
