set -x
npm run build-prod
set +x

echo 'Build completed -> copying builded file'
set -x
cp -a dist/. /var/www/paputea-admin-development/
set +x

echo 'Build and deploy completed.'