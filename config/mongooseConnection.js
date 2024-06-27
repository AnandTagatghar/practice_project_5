const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongooseConnection");
const config = require("config");

mongoose
  .connect(`${config.get("MONGODB_URI")}project5`)
  .then(() => {
    dbgr(`mongodb connected`);
  })
  .catch((err) => {
    dbgr(`mongodb connection failed: ${err}`);
  });
