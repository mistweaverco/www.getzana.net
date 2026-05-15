Require zana
Require zsh

Set Shell "zsh"
Set FontSize 12
Set Width 800
Set Height 600

Hide
Type "zana add npm:eslint@10.2.0"
Enter
Wait+Screen /.*Summary.*/
Type "clear" Enter
Show
Type "zana list --only-outdated"
Sleep 1s
Enter
Sleep 3s
