<script>
	import { onMount } from 'svelte';
	import { redirectTo } from './../redirectTo';
	let url = 'https://github.com/mistweaverco/zana-client/releases/latest';
	onMount(() => {
		url = redirectTo(url);
	});
</script>

<div class="z-10 hero bg-base-200 min-h-screen">
	<div class="hero-content text-center z-10">
		<div class="max-w-md z-10">
			<h1 class="text-5xl font-bold z-10 text-secondary">Redirecting..</h1>
			<p class="z-10 bg-base-200 mt-6 text-lg text-secondary text-center border rounded-lg border-secondary p-4">
				Redirecting to <a href={url}>{url}</a>..
			</p>
		</div>
	</div>
</div>
