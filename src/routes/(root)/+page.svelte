<script lang="ts">
	import { page } from '$app/state';
	import { browser } from '$app/environment';
	import { pushState } from '$app/navigation';
	import { InstallationMethod } from '$lib/enums';
	import HeadComponent from '$lib/HeadComponent.svelte';
	import type { TapeMarkdownData } from '$lib/screenshots';

	const { data } = $props();
	const params = $derived(browser ? Object.fromEntries(page.url.searchParams) : {});
	const tapes: TapeMarkdownData[] = $derived.by(() => {
		if (page.url.hash !== '#screenshots') return [];
		const { category, name } = params;
		if (!name || !category) return [];
		const source =
			category === 'cli'
				? data.cliCategoryData.find((item) => item.name.toLowerCase() === name.toLowerCase()) || {
						tapes: []
					}
				: data.cliCategoryData.find((item) => item.name.toLowerCase() === name.toLowerCase()) || {
						tapes: []
					};
		return source.tapes || [];
	});

	let activeIndex = $state(0);
	let heights: number[] = $state([]);
	let slideEls: HTMLElement[] = $state([]);
	let tapeEls: (HTMLImageElement | HTMLVideoElement)[] = $state([]);
	let activeTapeSlideMetadata: TapeMarkdownData['metadata'] | null = $state(null);

	let containerHeight = $state(0);

	const onParamsChange = async () => {
		if (page.url.hash === '#screenshots') {
			if (params.slide) {
				const anchor = document.getElementById('slide' + params.slide);
				if (anchor) {
					activeIndex = Number(params.slide) - 1;
					anchor.scrollIntoView({
						behavior: 'smooth',
						block: 'nearest',
						inline: 'center'
					});
					activeTapeSlideMetadata = tapes[activeIndex]?.metadata || null;
				}
			}
			return;
		}
	};

	$effect(() => {
		onParamsChange();
	});

	function measureContainerHeight(index: number) {
		const el = slideEls[index];
		if (!el) return;
		heights[index] = el.offsetHeight;
		console.log('Measured height:', heights[index]);
		if (index === activeIndex) containerHeight = heights[index];
	}

	const handleSectionAnchorClick = (evt: Event) => {
		evt.preventDefault();
		const link = evt.currentTarget as HTMLAnchorElement;
		const url = new URL(link.href);
		const hash = url.hash;
		const anchorId = hash.replace('#', '');
		const anchor = document.getElementById(anchorId);
		window.scrollTo({
			top: anchor?.offsetTop,
			behavior: 'smooth'
		});
		pushState(url.pathname + hash, '');
	};

	const lazyloadTapes = (node: (HTMLImageElement)) => {
		const mutationObserverTapes = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.type === 'attributes' && mutation.attributeName === 'data-src') {
					const img = mutation.target as HTMLImageElement;
					if (img.dataset.src) {
						img.src = img.dataset.src;
					}
				}
			});
		});
		mutationObserverTapes.observe(node, { attributes: true });
		const intersectionObserverTapes = new IntersectionObserver(
			(entries, obs) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const img = entry.target as HTMLImageElement;
						img.src = img.dataset.src || '';
						obs.unobserve(node);
					}
				});
			},
			{ rootMargin: '50px' }
		);
		intersectionObserverTapes.observe(node);
		return {
			destroy() {
				intersectionObserverTapes.unobserve(node);
				mutationObserverTapes.disconnect();
			}
		};
	};

	const onInstallationMethodChange = async (evt: Event) => {
		const target = evt.target as HTMLSelectElement;
		target.closest('form')?.submit();
	};
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
						<a href="#screenshots" onclick={handleSectionAnchorClick} class="btn btn-secondary btn-lg">Screenshots</a>
					</li>
					<li class="my-4">
						<a href="#installation" onclick={handleSectionAnchorClick} class="btn btn-secondary btn-lg">Install</a>
					</li>
					<li class="my-4">
						<a href="https://github.com/mistweaverco/zana-client#usage" class="btn btn-secondary btn-lg">Usage</a>
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

<div class="bg-base-200 min-h-screen flex flex-col justify-center">
	<a id="screenshots" aria-label="Screenshots section anchor"></a>
	<div class="text-center mb-10">
		<h1 class="text-5xl font-bold">Screenshots 📸</h1>
		<p class="pt-6">Some screenshots</p>
	</div>
	<div class="text-center mb-10">
		<div class="dropdown">
			<button
				tabindex="0"
				class="btn m-1 w-full justify-between {params.category === 'cli'
					? 'btn-outline btn-secondary'
					: 'btn-outline btn-accent'}"
			>
				{#if params.category === 'cli' && params.name}
					<i
						class="border-2 border-secondary rounded-full p-1 bg-secondary text-base-content {data.cliCategoryData.find(
							(item) => item.name === params.name
						)?.icon || ''}"
					></i>
				{/if}
				{activeTapeSlideMetadata ? activeTapeSlideMetadata.title : 'Select a category'}
			</button>
			<ul class="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow">
				{#each data.cliCategoryData as item, idx (idx)}
					<li>
						<a href="?category=cli&name={item.name}&slide=1#screenshots" class="flex items-center gap-2">
							{#if item.icon}
								<i class={item.icon}></i>
							{/if}
							{item.title}
						</a>
					</li>
				{/each}
			</ul>
		</div>
		{#if tapes.length === 0}
			<div role="alert" class="alert alert-warning max-w-md mx-auto mt-6 flex justify-center">
				<i class="fa-solid fa-triangle-exclamation"></i>
				<span>Please select a category to view screenshots.</span>
			</div>
		{/if}
	</div>
	<div
		class="text-center mb-10 w-full mx-auto carousel carousel-center space-x-4 rounded-box max-w-4xl"
		style="height: {containerHeight}px"
	>
		{#each tapes as image, index (index)}
			<div id={'slide' + (index + 1)} class="carousel-item relative">
				<div bind:this={slideEls[index]} class="card bg-base-100 shadow-xl mx-auto w-full">
					<figure>
						{#if image.metadata.url.endsWith('.webm')}
							<video
								onloadedmetadata={() => measureContainerHeight(index)}
								autoplay
								loop
								muted
								class="image"
								bind:this={tapeEls[index]}
								src="/assets/tapes/{params.category}/{params.name.toLowerCase()}/{image.metadata.url}"
							>
							</video>
						{:else}
							<img
								bind:this={tapeEls[index]}
								onload={() => measureContainerHeight(index)}
								use:lazyloadTapes
								data-src="/assets/tapes/{params.category}/{params.name.toLowerCase()}/{image.metadata.url}"
								alt={image.metadata.title}
								class="image"
							/>
						{/if}
					</figure>
					<div class="card-body">
						<h2 class="card-title justify-center tape-title">
						{#if image.metadata.link }
							<a
								href={image.metadata.link}
								target="_blank"
								class="link"
							>
								{image.metadata.title}
								<span class="fa-solid fa-link"></span>
							</a>
						{:else}
							{image.metadata.title}
						{/if}
						</h2>
						<div class="tape-content text-left">
							{@html image.content}
						</div>
					</div>
					<div class="absolute right-5 top-5 tooltip tooltip-left" data-tip="Open image in new tab">
						<a
							href="/assets/tapes/{params.category}/{params.name.toLowerCase()}/{image.metadata.url}"
							target="_blank"
							class="btn btn-soft btn-circle btn-secondary"
							aria-label="Open image in new tab"
						>
							<i class="fa-solid fa-expand"></i>
						</a>
					</div>
					<div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
						{#if index !== 0}
							<a
								href={'?category=' + params.category + '&name=' + params.name + '&slide=' + index + '#screenshots'}
								class="btn btn-circle btn-soft btn-secondary">❮</a
							>
						{:else}
							<div></div>
						{/if}
						{#if index !== tapes.length - 1}
							<a
								href={'?category=' +
									params.category +
									'&' +
									'name=' +
									params.name +
									'&slide=' +
									(index + 2) +
									'#screenshots'}
								class="btn btn-circle btn-soft btn-secondary">❯</a
							>
						{:else}
							<div></div>
						{/if}
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="text-center">
		<p>
			<a href="#installation" onclick={handleSectionAnchorClick}
				><button class="btn btn-secondary mt-5">Installation</button></a
			>
		</p>
	</div>
</div>

<div class="bg-base-200 min-h-screen flex flex-col justify-center">
	<a id="installation" aria-label="Installation section anchor"></a>
	<div class="text-center mb-10">
		<h1 class="text-5xl font-bold">Installation 🚀</h1>
		<p class="pt-6">How to install the CLI</p>
	</div>
	<div class="text-center mb-10">
		<form method="GET" action="#installation">
			<select name="pluginManager" class="select select-bordered mb-6" onchange={onInstallationMethodChange}>
				<option disabled selected={params.pluginManager ? null : true}>Select</option>
				<option
					selected={params.pluginManager === InstallationMethod.Linux ? true : null}
					value={InstallationMethod.Linux}>Linux</option
				>
				<option
					selected={params.pluginManager === InstallationMethod.Mac ? true : null}
					value={InstallationMethod.Mac}>Mac</option
				>
				<option
					selected={params.pluginManager === InstallationMethod.Windows ? true : null}
					value={InstallationMethod.Windows}>Window</option
				>
			</select>
		</form>
	</div>
	{#if params.pluginManager}
		<div class="text-center mb-10 w-full mx-auto carousel carousel-center space-x-4 rounded-box max-w-4xl">
			<div class="m-auto text-left">
				{@html data.installationCode[params.pluginManager as InstallationMethod]}
			</div>
		</div>
	{/if}
</div>

<style>
	.carousel {
		overflow-y: hidden;
	}
	.carousel-item {
		position: relative;
		flex: 0 0 auto;
		display: block;
		width: 100%;
		transition: height 300ms ease;
	}
	.image {
		width: 100%;
		height: auto;
		pointer-events: none;
	}
	.tape-title {
		font-size: 1.4rem;
	}
	:global(.tape-content p) {
		margin-top: 1rem;
		margin-bottom: 1rem;
		font-size: 1.2rem;
	}
</style>
