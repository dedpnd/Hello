[**SSH**](https://help.github.com/articles/connecting-to-github-with-ssh/)

###### Set global setings
```
git config --global user.name "John Doe"
git config --global user.email johndoe@example.com
```
###### Create a new repository
```
git clone git@example:user/helper_git.git
cd helper_git
touch README.md
git add README.md
git commit -m "add README"
git push -u origin master
```
###### Existing folder
```
cd existing_folder
git init
git remote add origin git@example:user/helper_git.git
git add .
git commit
git push -u origin master
```
###### Existing Git repository
```
cd existing_repo
git remote add origin git@example:user/helper_git.git
git push -u origin --all
git push -u origin --tags
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
