const mongoose = require("mongoose");

function DBconn(){
    const conn_url=process.env.MONGODB;
    mongoose.connect(conn_url);
}
const db = mongoose.connection;
db.on("error",console.error.bind(console,"Error"));
db.once("open", ()=>{
    console.log("DB CONNECTED!!");
});


module.exports = DBconn;