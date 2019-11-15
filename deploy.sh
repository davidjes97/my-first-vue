set -e

yarn build

cd dist

git init
git add -addgit commit -m 'deploy'

git push -f https://davidjes97.github.io/my-first-vue.git master:gh-pages