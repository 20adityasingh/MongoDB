const express = require("express")
const dotenv = require("dotenv")

const app = express();
const DBConnection = require("./MongoDB");


dotenv.config();
DBConnection();

const port = 8081;

app.listen(port, ()=>{
    console.log(`Server has been started at port ${port}`);
})
