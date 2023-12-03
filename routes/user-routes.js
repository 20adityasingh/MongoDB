const express = require("express");

const router = express.Router();

// const { users } = require("../DATA/user.json");
// const { books } = require("../DATA/books.json");
const { usermodel, bookmodel } = require("../modals/both-modal");

router.get("/", (req, res) => {
  res.status(200).send({
    data: users,
  });
});

router.post("/add", (req, res) => {
  const { id, name, surname, email, subscriptionType, subscriptionDate } =
    req.body;
  const user = users.find((each) => each.id === id);
  if (user) {
    return res.status(404).send({
      message: "User already exist!",
    });
  }
  users.push({
    id,
    name,
    surname,
    email,
    subscriptionType,
    subscriptionDate,
  });
  res.status(201).send({
    message: "User Added Successfully :-)",
    data: users,
  });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const { data } = req.body;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User Doesn't exist!",
    });
  }
  const updateUserData = users.map((each) => {
    if (each.id === id) {
      return {
        ...each,
        ...data,
      };
    }
    return each;
  });
  return res.status(200).send({
    message: "User Updated Successfully",
    data: updateUserData,
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  res.status(200).send({
    data: user,
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const user = users.find((each) => each.id === id);
  if (!user) {
    return res.status(404).send({
      message: "User not found",
    });
  }
  const index = users.indexOf(user);
  users.splice(index, 1);
  return res.status(200).send({
    message: "User Deleted",
    data: users,
  });
});

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
