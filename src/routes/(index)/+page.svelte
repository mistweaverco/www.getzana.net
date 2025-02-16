<script>
	import './modal.css';
	import './font-settings.css';
	import './grid.css';
	import HeadComponent from '$lib/HeadComponent.svelte';

	const DOWNLOAD_BASE = 'https://github.com/mistweaverco/zana-gui/releases/latest/download/';

	/**
	 * @type {boolean}
	 */
	let modalLinuxDownloadIsActive = false;

	const toggleModalLinuxDownload = () => {
		modalLinuxDownloadIsActive = !modalLinuxDownloadIsActive;
	};
</script>

<HeadComponent
	data={{
		title: 'Zana',
		description:
			'Zana is Mason.nvim, but maintained by the community. A package manager for Neovim. Easily install and manage LSP servers, DAP servers, linters, and formatters.'
	}}
/>

<div class="modal {modalLinuxDownloadIsActive ? 'is-active' : ''}">
	<div class="modal-background"></div>
	<div class="modal-content">
		<button on:click={toggleModalLinuxDownload} class="modal-close is-large" aria-label="close">
			<span aria-hidden="true">&times;</span>
		</button>
		<div class="box">
			<button class="button is-debian">
				<a href="{DOWNLOAD_BASE}zana-gui_amd64.deb">
					<span class="icon">
						<i class="fa-brands fa-debian"></i>
					</span>
					<span>.deb</span>
				</a>
			</button>
			<button class="button is-snap">
				<a href="{DOWNLOAD_BASE}zana-gui_amd64.snap">
					<span class="icon">
						<i class="fa-brands fa-linux"></i>
					</span>
					<span>.snap</span>
				</a>
			</button>
			<button class="button is-appimage">
				<a href="{DOWNLOAD_BASE}zana-gui_x86_64.AppImage">
					<span class="icon">
						<i class="fa-solid fa-gear"></i>
					</span>
					<span>.AppImage</span>
				</a>
			</button>
			<button class="button is-flatpak">
				<a href="{DOWNLOAD_BASE}zana-gui_x86_64.flatpak">
					<span class="icon">
						<i class="fa-solid fa-cube"></i>
					</span>
					<span>.flatpak</span>
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
		<a href="https://www.electronjs.org/">
			<img class="badge" src="/badge-electron.svg" alt="Made with Electron" />
		</a>
		<a href="https://vite.dev/">
			<img class="badge" src="/badge-vite.svg" alt="Powered by Vite" />
		</a>
		<a href="https://github.com/mistweaverco/zana-gui/graphs/contributors">
			<img class="badge" src="/badge-made-with-love.svg" alt="Made with love by the community" />
		</a>

		<hr />

		<div class="download-buttons" id="download">
			<button class="button is-windows">
				<a
					href="https://github.com/mistweaverco/zana-gui/releases/latest/download/zana-gui-setup_x64.exe"
				>
					<span class="icon"><i class="fa-brands fa-windows"></i></span> <span>Windows</span></a
				>
			</button>
			<button class="button is-mac">
				<a
					href="https://github.com/mistweaverco/zana-gui/releases/latest/download/zana-gui_universal.dmg"
				>
					<span class="icon"><i class="fa-brands fa-apple"></i></span> <span>Mac</span></a
				></button
			>
			<button on:click={toggleModalLinuxDownload} class="button is-linux">
				<span class="icon">
					<i class="fa-brands fa-linux"></i>
				</span>
				<span>Linux</span>
			</button>
		</div>
		<p>
			Zana is a <strong>minimal package manager</strong> for
			<a href="https://github.com/mistweaverco/zana.nvim">Neovim</a>.
			<strong>Easily install</strong> and <strong>manage</strong> LSP servers, DAP servers, linters,
			and formatters and more.
		</p>
	</div>
</div>

<hr />

<div class="container is-more">
	<div class="inner">
		<h2>Availibility</h2>
		<p>
			<strong>Zana</strong> GUI is currently in active development 🚀, but in its early stages.
		</p>
		<p>
			While we are working hard to bring it to production, expect frequent changes and improvements.
		</p>
		<p>
			Stay tuned for
			<a href="https://bsky.app/profile/mistweaverco.com">updates</a> and follow the project on
			<a href="https://github.com/mistweaverco/zana-gui">Github</a>.
		</p>

		<hr />

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
	a:visited {
		color: #fff;
	}
</style>
