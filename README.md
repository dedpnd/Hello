[SSH](https://help.github.com/articles/connecting-to-github-with-ssh/)

###### Set global setings
```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```

###### Example other branch
```
git clone https://github.com/tonychacon/blink
git status
git checkout -b slow-blink
git diff --word-diff
git add .
git commit -a -m 'three seconds is better'
git push origin slow-blink
```

###### Change branch
```
git checkout master
git pull
```

###### Fetch upstream
```
git remote add upstream https://github.com/robbyrussell/oh-my-zsh
git fetch upstream
git merge upstream/master
git push origin master
```

###### Reset commit
```
git reset HEAD CONTRIBUTING.md
```
