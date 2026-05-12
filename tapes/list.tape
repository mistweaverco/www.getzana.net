Require zana
Require zsh

Set Shell "zsh"
Set FontSize 12
Set Width 800
Set Height 600

Hide
Type "zana add npm:eslint@10.3.0 npm:@mistweaverco/kulala-fmt pypi:yamllint"
Enter
Wait+Screen /.*Summary.*/
Type "clear" Enter
Show
Type "zana list"
Sleep 1s
Enter
Sleep 3s
