Require zana
Require zsh

Set Shell "zsh"
Set FontSize 12
Set Width 800
Set Height 600

Type "zana add --integrate neovim svelte"
Enter
Wait+Screen /.*in multiple providers.*/
Sleep 2s
Type "/"
Sleep 1s
Type "tree-sitter"
Sleep 1s
Enter
Sleep 1s
Type "x"
Sleep 1s
Enter
Wait+Screen /.*can fetch.*/
Sleep 5s
Type "y"
Wait+Screen /.*Summary.*/
Sleep 3s
