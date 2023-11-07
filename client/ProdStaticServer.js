import express from "express";
const app = express();
const port = 3000;

const staticFolder = `${process.cwd()}/dist`;
app.use(express.static(staticFolder));
app.get("/", function (req, res) {
  res.sendFile(`${staticFolder}/index.html`);
});
app.listen(port);
console.log(`Static Server listening on port ${port}`);
