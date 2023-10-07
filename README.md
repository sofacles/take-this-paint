I am going to start on the new version of the pain app because it's too hard to comment out all the broken stuff in the orginal repo
I'm loosely following https://github.com/NathanKr/react-vite-express-setup

mkdir take-this-paint
cd take-this-paint/
npm create vite@latest client
select react, typescript + SWC (speedy web compiler) (edited)

cd client
npm install
npm run dev

I started with `npx express-generator-typescript server`, but found it confusing and instead went with: https://blog.logrocket.com/how-to-set-up-node-typescript-express/

## Adding typescript manually to a vanilla node project

in a new server folder I run `npm init --yes`

`npm install express dotenv`

npm i -D typescript @types/express @types/node
npx tsc --init //generates tsconfig.json

the tsconfig it generates is mostly commented out, look for outDir and change the line to: "outDir": "./dist",
and change the code in your index file to what's in the link above and change it to .ts
npm install -D concurrently nodemon

"scripts": {
"build": "npx tsc",
"start": "node dist/index.js",
"dev": "concurrently \"npx tsc --watch\" \"nodemon -q dist/index.js\""
}

I might try it with ts-node too, but for now let's see if I can add an API endpoint
OK, I added this to vite.config.ts

```
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/health": "http://localhost:8000/",
    },
  },
});
```

and I have a route in index.ts:

```
app.get("/api/health", getHealth);
```

and it works.

So, now let's look at ts-node

## ts-node

Rename server to express-server and make a new server folder. In it:

npm install typescript ts-node --save
npm install express dotenv --save

copy over
express-server/
--index.ts
--routes
--.env (but have it use port 8888)

add a scripts field to package.json with `"dev": "ts-node index.ts"`

When I run the "both" script, I see: `error TS7016: Could not find a declaration file for module 'express'... Try npm i --save-dev @types/express`

after I do that, I see `Could not find a declaration file for module './routes/health' ... implicitly has an 'any' type`

I ended up on https://github.com/TypeStrong/ts-node/issues/935 where I learned that putting this in tsconfig.json

```
{
    "compilerOptions": {
        "esModuleInterop": true,
    },
    "ts-node": {
      "experimentalResolver": true
    }
  }
```

allowed me to load the vite page and make an api call to express run by ts-node.

## Mongoose

npm i mongoose --save
So, I learned that the factory pattern I was following in PaintChip was useful and necessary. I've been thinking that constructing mongoose models like:

```
const PaintCanSchema = new mongoose.Schema({ color: "red"}
```

was using the mongoose object that you get when you `import` mongoose. But all the setting up of error, connect and disconnect event handlers that I was doing in `mongooseConnection.js` and then calling `mongoose.connect(uri, options)` has to have happened to that mongoose object for model methods to work.

All that `mongooseConnection` exports now is a function that takes a callback argument. The function subscribes to the `connected` handler:

```
const onConnected = (cb) => {
  mongoose.connection.on("connected", () => cb(mongoose)); // mongoose arg has been set up while the module is loading
};
```

```
//index.ts
onConnected((mg) => {
  connectedMongoose = mg;
  HydrateModels(mg);
});
```
