echo "Switching to branch master"
git checkout master

echo "Building..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@120.79.159.198:/var/www/120.79.159.198/

echo "Done"