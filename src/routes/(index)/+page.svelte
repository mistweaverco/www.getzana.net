<script lang="ts">
	import './modal.css';
	import './font-settings.css';
	import './grid.css';
	import HeadComponent from '$lib/HeadComponent.svelte';

	const DOWNLOAD_BASE = 'https://github.com/mistweaverco/zana-client/releases/latest/download/';

	let modalArchDownloadIsActive: boolean = false;

	type Platform = 'windows' | 'darwin' | 'linux' | null;

	let downloadPrimaryPlatform: Platform = null;

	let primaryDownloadLink = '';
	let primaryDownloadLinkText = '64 bit';
	let secondaryDownloadLink = '';
	let secondaryDownloadLinkText = '32 bit';

	const toggleModalArchDownload = (evt: Event) => {
		evt.preventDefault();
		const target = evt.target as HTMLElement;
		const btn = target.closest('button') as HTMLButtonElement;
		downloadPrimaryPlatform = btn.dataset.platform as Platform;
		modalArchDownloadIsActive = !modalArchDownloadIsActive;
		primaryDownloadLink = `${DOWNLOAD_BASE}zana-${downloadPrimaryPlatform}-amd64${
			downloadPrimaryPlatform === 'windows' ? '.exe' : ''
		}`;
		if (downloadPrimaryPlatform !== 'darwin') {
			secondaryDownloadLinkText = '32 bit';
			secondaryDownloadLink = `${DOWNLOAD_BASE}zana-${downloadPrimaryPlatform}-i386${
				downloadPrimaryPlatform === 'windows' ? '.exe' : ''
			}`;
		} else {
			secondaryDownloadLinkText = 'arm64';
			secondaryDownloadLink = `${DOWNLOAD_BASE}zana-${downloadPrimaryPlatform}-arm64`;
		}
	};
</script>

<HeadComponent
	data={{
		title: 'Zana',
		description:
			'Zana is Mason.nvim, but maintained by the community. A package manager for Neovim and more. Easily install and manage LSP servers, DAP servers, linters, and formatters.'
	}}
/>

<div class="modal {modalArchDownloadIsActive ? 'is-active' : ''}">
	<div class="modal-background"></div>
	<div class="modal-content">
		<button on:click={toggleModalArchDownload} class="modal-close is-large" aria-label="close">
			<span aria-hidden="true">&times;</span>
		</button>
		<div class="box">
			<button class="button is-primary-dl">
				<a href={primaryDownloadLink}>
					<span>{primaryDownloadLinkText}</span>
				</a>
			</button>
			<button class="button is-secondary-dl">
				<a href={secondaryDownloadLink}>
					<span>{secondaryDownloadLinkText}</span>
				</a>
			</button>
		</div>
	</div>
</div>

<div class="container is-intro">
	<div class="inner">
		<img class="logo" src="/logo.svg" alt="Zana logo" />
		<header>Zana</header>
		<a href="https://github.com/mistweaverco/zana.nvim">
			<img class="badge" src="/badge-neovim.svg" alt="neovim" />
		</a>
		<a href="https://getzana.net/discord">
			<img class="badge" src="/badge-discord.svg" alt="Join our Discord" />
		</a>
		<a href="https://www.lua.org/">
			<img class="badge" src="/badge-made-with-lua.svg" alt="Made with lua" />
		</a>
		<a href="https://www.typescriptlang.org/">
			<img class="badge" src="/badge-typescript.svg" alt="Made with TypeScript" />
		</a>
		<a href="https://go.dev/">
			<img class="badge" src="/badge-golang.svg" alt="Made with Go" />
		</a>
		<a href="https://vite.dev/">
			<img class="badge" src="/badge-vite.svg" alt="Powered by Vite" />
		</a>
		<a href="https://github.com/mistweaverco/zana-client/graphs/contributors">
			<img class="badge" src="/badge-made-with-love.svg" alt="Made with love by the community" />
		</a>

		<hr />

		<div class="download-buttons" id="download">
			<button on:click={toggleModalArchDownload} class="button is-windows" data-platform="windows">
				<span class="icon"><i class="fa-brands fa-windows"></i></span> <span>Windows</span>
			</button>
			<button on:click={toggleModalArchDownload} class="button is-mac" data-platform="darwin">
				<span class="icon"><i class="fa-brands fa-apple"></i></span> <span>Mac</span>
			</button>
			<button on:click={toggleModalArchDownload} class="button is-linux" data-platform="linux">
				<span class="icon">
					<i class="fa-brands fa-linux"></i>
				</span>
				<span>Linux</span>
			</button>
		</div>
		<p>
			Zana is a minimal <strong>TUI</strong> for managing LSP servers, DAP servers, linters, and
			formatters, for <a href="https://github.com/mistweaverco/zana.nvim">Neovim</a>, but not
			limited to just Neovim.
		</p>
	</div>
</div>

<hr />

<div class="container is-more">
	<div class="inner">
		<h2>Availability</h2>
		<p>
			<strong>Zana</strong> is currently in active development 🚀, but in its early stages.
		</p>
		<p>
			While we are working hard to bring it to production, expect frequent changes and improvements.
		</p>
		<p>
			Stay tuned for
			<a href="https://bsky.app/profile/mistweaverco.com">updates</a> and follow the project on
			<a href="https://github.com/mistweaverco/zana-client">Github</a>.
		</p>

		<hr />

		<img class="logo" src="/logo-golang-bubbletea.svg" alt="Golang Bubbletea logo" />
		<h2>Powered by Bubble-Tea</h2>
		<p>
			<strong>Powered by</strong>
			<a href="https://github.com/charmbracelet/bubbletea">Bubble-Tea</a>
			and written in
			<a href="https://golang.org">Go</a>.
		</p>
		<hr />

		<img class="logo" src="/logo-golang-bubbles.svg" alt="Golang Bubbles logo" />
		<h2>.. with bubbles</h2>
		<p>
			Bubble-Tea with <strong><a href="https://github.com/charmbracelet/bubbles">bubbles</a></strong
			>, a terminal framework for Go, inspired by The Elm Architecture.
		</p>

		<hr />

		<img class="logo" src="/logo-golang-lipgloss.svg" alt="Golang Lipgloss logo" />
		<h2>Styled with Lipgloss</h2>
		<p>
			<strong>Styled with</strong> <a href="https://github.com/charmbracelet/lipgloss">Lipgloss</a>,
			a cross-platform Go styling library for creating and styling terminal output.
		</p>

		<hr />

		<p>
			From the community, for the community. <strong>Open Source</strong> and <strong>free</strong> to
			use.
		</p>
		<a href="https://mistweaverco.com">
			<img
				class="mwbadge"
				src="/mistweaverco-logo.svg"
				alt="mistweaverco"
				title="Brought to you by mistweaverco."
			/>
		</a>
	</div>
</div>

<style>
	a:link,
	a:visited {
		color: #fff;
	}
</style>
