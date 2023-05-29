const path = require("path");
const app = require("./index");

const port = process.env.PORT;
app.listen(2000, () => {
  console.log("listening on port " + 2000);
});
