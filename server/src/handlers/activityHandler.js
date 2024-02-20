const {
  createActivity,
  getActivities,
} = require("../controllers/activityController");

const createActivityHandler = async (req, res) => {
  const { name, difficulty, duration, season, countries } = req.body;

  try {
    await createActivity(name, difficulty, duration, season, countries);
    res.status(201).send("Activity created");
  } catch (error) {
    console.log(error.message);
    res.status(400).send("400 - We could't create the activity");
  }
};

const getActivitiesHandler = async (req, res) => {
  try {
    const activities = await getActivities();
    res.status(200).json(activities);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { createActivityHandler, getActivitiesHandler };
