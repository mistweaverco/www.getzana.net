<script lang="ts">
	import HeadComponent from '$lib/HeadComponent.svelte';
</script>

<HeadComponent
	data={{
		title: 'Zana - Editor-agnostic package manager for Tree-sitter parsers, LSP servers, DAP servers, linters and formatters and more.',
		description:
			'Zana aims to be an editor-agnostic package manager for Tree-sitter parsers, LSP servers, DAP servers, linters and formatters and more.'
	}}
/>

<div class="z-50 fixed right-5 top-5 tooltip tooltip-left" data-tip="Open GitHub repository">
	<a
		href="https://github.com/mistweaverco/zana-client"
		class="btn btn-circle btn-xl btn-ghost"
		aria-label="Open GitHub repository"
	>
		<i class="fa fa-brands fa-github fa-xl"></i>
	</a>
</div>

<div id="start" class="z-10 hero bg-base-200 min-h-screen">
	<div class="hero-content text-center z-10">
		<div class="max-w-md z-10">
			<img src="/logo.svg" alt="zana logo" class="m-5 mx-auto w-64 z-10" />
			<h1 class="text-5xl font-bold z-10 text-secondary">Zana</h1>
			<div class="z-10 flex justify-center">
				<ul class="z-10 flex flex-col md:flex-row gap-4 mt-6">
					<li class="my-4">
						<a href="/download" data-sveltekit-preload-data="off" class="btn btn-secondary btn-lg">CLI</a>
					</li>
					<li class="my-4">
						<a href="https://registry.getzana.net/" class="btn btn-secondary btn-lg">Registry</a>
					</li>
				</ul>
			</div>
			<p class="z-10 bg-base-200 mt-6 text-lg text-secondary text-center border rounded-lg border-secondary p-4">
				Zana 🌈 aims to be an editor-agnostic 🫶 package manager 📦 for Tree-sitter parsers, LSP servers, DAP servers, linters and formatters and more.
			</p>
		</div>
	</div>
</div>
