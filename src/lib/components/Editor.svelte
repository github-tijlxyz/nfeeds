<script lang="ts">
	import { feeds } from '../stores/feeds';
	import { Input } from './ui/input';
	import * as Select from './ui/select';
    import * as Tabs from '@/lib/components/ui/tabs';

	export let feedId: string;

	let feed = $feeds[feedId];
</script>

{JSON.stringify(feed)}

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
