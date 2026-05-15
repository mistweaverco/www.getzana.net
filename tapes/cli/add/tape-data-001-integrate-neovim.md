---
title: Add Tree-sitter integration to Neovim
url: integrate-neovim.webm
---

You can add Tree-sitter integration to Neovim with the following command:

```sh
zana add --integrate neovim svelte
```

To automatically start Tree-sitter for files with installed parsers,
you can add the following code to your Neovim configuration:

```lua path=~/.config/nvim/init.lua
-- Read from site/parsers/*.{so,dylib,dll} to get the list of installed parsers
-- and remove the path and extension to get the parser names
local installed_parsers = vim.fn.globpath(vim.fn.stdpath("data") .. "/site/parser", "*.{so,dylib,dll}", true, true)
for i, parser in ipairs(installed_parsers) do
  installed_parsers[i] = vim.fn.fnamemodify(parser, ":t:r")
end

vim.api.nvim_create_autocmd("FileType", {
  callback = function(args)
    if not vim.list_contains(installed_parsers, args.match) then
      return
    end
    vim.treesitter.start(args.buf)
  end,
})
```
