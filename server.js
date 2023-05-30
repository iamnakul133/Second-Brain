const path = require("path");
const app = require("./index");

const port = process.env.PORT;
app.listen(port, () => {
  console.log("listening on port " + 2000);
});
