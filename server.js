const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

console.log(process.env);
const app = require("./app");

const port = 3000;
app.listen(port, () => {
  console.log("Listening to server ...");
});
