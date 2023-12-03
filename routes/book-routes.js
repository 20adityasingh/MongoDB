const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookbyID,
  getAllissuedBooks,
  addNewbook,
  UpdatebookbyID,
} = require("../controllers/book-controller");


router.get("/all", getAllBooks);

router.get("/:id", getBookbyID);

router.put("/update/:id", UpdatebookbyID);

router.get("/issued/by-user", getAllissuedBooks);

router.post("/add", addNewbook);

module.exports = router;
