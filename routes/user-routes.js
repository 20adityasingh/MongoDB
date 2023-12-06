const express = require("express");

const router = express.Router();

const {getAllusers, addUser, updateUserbyID, getUserbyID, deleteUserbyID} = require("../controllers/user-controller")

router.get("/all", getAllusers);

router.post("/add", addUser);

router.put("/:id", updateUserbyID);

router.get("/:id", getUserbyID);

router.delete("/:id", deleteUserbyID);

router.get("/subscription-details/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  const dateINdays = (data = "") => {
    let date;
    if (data === "") {
      date = new Date();
    } else {
      date = new Date(data);
    }
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  const subscriptionType = (date) => {
    if (user.subscriptionType === "Basic") {
      date = date + 90;
    } else if (user.subscriptionType === "Standard") {
      date = date + 180;
    } else if (user.subscriptionType === "Premium") {
      date = date + 365;
    }
    return date;
  };
  let returnDate = dateINdays(user.returnDate);
  let currentDate = dateINdays();
  let subscriptionDate = dateINdays(user.subscriptionDate);
  let subscriptionExpirationdate = subscriptionType(subscriptionDate);

  const data = {
    ...user,
    isSubscriptionExperied: subscriptionExpirationdate <= currentDate,
    DateleftforSubsExpiration:
      subscriptionExpirationdate <= currentDate
        ? 0
        : subscriptionExpirationdate - currentDate,
    fine:
      returnDate < currentDate
        ? subscriptionExpirationdate <= currentDate
          ? 100
          : 50
        : 0,
  };
  return res.status(200).send({
    message: "Subscription Detai Of User",
    data: data,
  });
});

module.exports = router;
