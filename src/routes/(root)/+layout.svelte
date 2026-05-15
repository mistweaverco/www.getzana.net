<script lang="ts">
	import '@fortawesome/fontawesome-free/css/all.min.css';
	import '../../app.css';
	import '@mistweaverco/mdsvex-shiki/styles.css';
	import { copyAction } from '@mistweaverco/mdsvex-shiki/copyAction';
	let { children } = $props();
</script>

<div use:copyAction>
	{@render children()}
</div>
