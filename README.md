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
