const {usermodel, bookmodel} = require("../modals/both-modal");

const getAllusers = async (req, res) => {
    const users = await usermodel.find();
    res.status(200).send({
    data: users,
    });
};

const addUser = async (req, res) => {
  const {data} = req.body;
  if (!data) {
    return res.status(404).send({
      message: "No data to be added!",
    });
  }
  await usermodel.create(data);
  const users = await usermodel.find();
  res.status(201).send({
    message: "User Added Successfully :-)",
    data: users,
  });
};

const updateUserbyID = async (req, res) => {
  const {id} = req.params;
  const { data } = req.body;
  const user = await usermodel.findById(id);
  if (!user) {
    return res.status(404).send({
      message: "User Doesn't exist!",
    });
  }
  const updateUserData = await usermodel.findOneAndUpdate({_id:id},data,{new:true})
  return res.status(200).send({
    message: "User Updated Successfully",
    data: updateUserData,
  });
};

const getUserbyID = async (req, res) => {
  const { id } = req.params;
  const user = await usermodel.findById(id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  res.status(200).send({
    data: user,
  });
};

const deleteUserbyID = async (req, res) => {
  const { id } = req.params;
  const user = await usermodel.findById(id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  await usermodel.findOneAndDelete({_id:id})
  const users = await usermodel.find();
  res.status(200).send({
    message:"User Deleted",
    data: users,
  });
};


module.exports = {getAllusers, addUser, updateUserbyID, getUserbyID,deleteUserbyID}