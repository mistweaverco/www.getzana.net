import { getMdsvexShikiHighlighter, type MdsvexHighlighter } from "@mistweaverco/mdsvex-shiki";
import { InstallationMethod } from "$lib/enums";
import { CategoryName, getCategoryData } from "$lib/screenshots";
import installCodeLinux from "./install-code-linux.sh?raw";
import installCodeMac from "./install-code-mac.sh?raw";
import installCodeWindows from "./install-code-windows.ps1?raw";

const getInstallCode = async (shiki: MdsvexHighlighter, method: InstallationMethod) => {
	let codeSnippet = "";
	let path = "";
	let lang = "";
	switch (method) {
		case InstallationMethod.Linux:
			codeSnippet = installCodeLinux;
			path = "install.sh";
			lang = "bash";
			break;
		case InstallationMethod.Mac:
			codeSnippet = installCodeMac;
			path = "install.sh";
			lang = "bash";
			break;
		case InstallationMethod.Windows:
			codeSnippet = installCodeWindows;
			path = "install.ps1";
			lang = "powershell";
			break;
	}
	return shiki(codeSnippet, lang, `path=${path}`);
};

export const load = async () => {
	const shiki = await getMdsvexShikiHighlighter({
		shikiOptions: {
			langs: ["bash", "powershell", "sh"],
		},
	});

	const cliCategoryData = await getCategoryData(CategoryName.CLI);

	return {
		cliCategoryData: cliCategoryData,
		installationCode: {
			[InstallationMethod.Linux]: await getInstallCode(shiki, InstallationMethod.Linux),
			[InstallationMethod.Mac]: await getInstallCode(shiki, InstallationMethod.Mac),
			[InstallationMethod.Windows]: await getInstallCode(shiki, InstallationMethod.Windows),
		},
	};
};
