const { usermodel, bookmodel } = require("../modals/both-modal");
const IssuedBook = require("../DTO/Book-DTO")

const getAllBooks = async(req,res) => {
    const book = await bookmodel.find();

    if(!book){
        return res.status(404).send({
            message:"Book not Found."
        });
    }
    res.status(200).send({
        message: "Books Found",
        data: book
    });
};

const getBookbyID = async(req, res) => {
    const { id } = req.params;
    const book = await bookmodel.findById(id);
    if (!book) {
      return res.status(404).send({
        message: "Book doesn't exist",
      });
    }
    res.status(200).send({
      data: book,
    });
};

const getAllissuedBooks= async(req,res) => {
    const user = await usermodel.find({
        issuedBook: {$exists: true}
    }).populate("issuedBook")

    const issuedBooks = user.map((each)=> new IssuedBook(each));   

    if (issuedBooks.length === 0) {
      return res.status(404).send({ message: "No books issued yet." });
    }

    return res.status(200).send({ data: issuedBooks });
}

const addNewbook = async (req,res)=>{
    const {data}  = req.body;
    if(!data){
        return res.status(404).send({
            message:"No DATA to be added"
        });
    }
    await bookmodel.create(data);
    const allbooks = await bookmodel.find();
    res.status(200).send({
      message: "Book added",
      data:allbooks
    });
}

const UpdatebookbyID = async (req,res) => {
    const { id } = req.params;
    const book = await bookmodel.findById(id);
    const { data } = req.body;
    if (!book) {
      return res.status(404).send({
        message: "Book doesn't exist",
      });
    }
    const updatedBook = await bookmodel.findOneAndUpdate({_id:id},data,{new:true});
    res.status(201).send({
      message: "Book Updated",
      data: updatedBook,
    });
}

module.exports = {
  getAllBooks,
  getBookbyID,
  getAllissuedBooks,
  addNewbook,
  UpdatebookbyID,
};
