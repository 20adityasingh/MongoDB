const express = require("express")
const dotenv = require("dotenv")

const app = express();
const DBConnection = require("./MongoDB");


const userRouter = require("./routes/user-routes");

const bookRouter = require("./routes/book-routes");

app.use(express.json());

dotenv.config();
DBConnection();

const port = 8081;

app.get("/", (req, res) => {
  return res.status(200).send({
    message: "Server has started",
    data: "Hey! Continue your work :-)",
  });
});

app.use("/user", userRouter);

app.use("/book", bookRouter);

app.listen(port, ()=>{
    console.log(`Server has been started at port ${port}`);
})
