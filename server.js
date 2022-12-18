const port = 3000 || 5000;
const app = require("./app");
const mongoConnection = require("./database/db");
require("dotenv").config();

mongoConnection(process.env.MONGO_URI);

app.listen(port, () => {
  console.log("server has started on port 3000");
});
