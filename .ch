There is a link to configure.11nator.com from testnator.com or 11nator.com
We set up an s3 repository and cloudfront do deliver content for this app.

How to build and deploy:

cd eleven-configure 
ng build   
cd dist/eleven-configure
aws s3 sync . s3://configure.11nator.com/
aws cloudfront create-invalidation --distribution-id E2UF1YA60F3KB7 --paths '/*'
