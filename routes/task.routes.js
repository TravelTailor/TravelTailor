const router = require("express").Router();
const Task = require("../models/Task.model");
const Travel = require("../models/Travel.model");
const User = require("../models/User.model");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard.js");
const apiKey = process.env.OPENTRIPMAP;

//Create task form
router.get("/travel-list/:travelId/create-task", (req, res, next) => {
  const { travelId } = req.params;

  res.render("tasks/create-task", { travelId });
});

router.post("/travel-list/:travelId/create-task", (req, res, next) => {
  const { task, date, status, price } = req.body;
  const { travelId } = req.params;

  if (!task || !date || !status || !price) {
    res.render("tasks/create-task", {
      errorMessage:
        "All fields are mandatory. Please provide task, date, status and price.",
    });
    return;
  }

  Task.create({
    task,
    date,
    status,
    price,
    travel: travelId,
  })
    .then((task) => {
      console.log("Newly created task is: ", task);
      res.redirect(`/travel-list/${travelId}`);
    })
    .catch((error) => next(error));
});

//Delete task
router.post("/travel-list/:travelId/delete-task/:taskId", (req, res, next) => {
  const { travelId, taskId } = req.params;

  Task.findByIdAndDelete(taskId)
    .then(() => res.redirect(`/travel-list/${travelId}`))
    .catch((error) => {
      console.log("Error while deleting task: ", error);

      next(error);
    });
});

//Search tasks with API OpenTripMap data
router.get("/travel-list/:travelId/create-task/search-task", (req, res, next) => {});

module.exports = router;
