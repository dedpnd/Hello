git config --global user.name "John Doe"
git config --global user.email johndoe@example.com

git clone https://github.com/tonychacon/blink
git status
git checkout -b slow-blink
git diff --word-diff
git commit -a -m 'three seconds is better'
git push origin slow-blink

git checkout master
git pull
