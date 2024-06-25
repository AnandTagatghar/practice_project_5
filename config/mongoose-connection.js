const mongoose = require("mongoose");
const dbgr = require("debug")('development:mongoose-connection');
const config = require("config");

mongoose.connect(`${config.get("MONGOOSE_URL")}/project5`).then(() => {
    dbgr("Connected");
}).catch((err) => {
    dbgr(`Not Connected -> ${err}`);
})

module.exports = mongoose.connection;