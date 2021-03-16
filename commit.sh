if [ ! $1 ]; then
  echo 'commit description not found, you should run: sh commit.sh "description"'
  exit
fi

# npm run lint-fix
git add .
git commit -m$1
