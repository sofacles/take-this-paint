docker run --name mongodb -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=timmy -e MONGO_INITDB_ROOT_PASSWORD=spider mongodb/mongodb-community-server:6.0-ubi8

mongoimport --db meals --collection meals2023 --file route/to/archive.json --jsonArray -u timmy -p spider --authenticationDatabase=admin


run npm run build in the server folder
I added `"start:prod": "node build/server/index.js"` to server/package.json to test it locally
run npm run build in the client folder