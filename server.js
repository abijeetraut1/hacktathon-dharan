const app = require("./app");
const mongoConnection = require("./database/db");
require("dotenv").config();

mongoConnection(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("server has started on port 3000");
});
