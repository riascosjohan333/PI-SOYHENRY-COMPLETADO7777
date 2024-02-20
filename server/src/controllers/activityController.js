const { Country, Activity } = require("../db");

const createActivity = async (
  name,
  difficulty,
  duration,
  season,
  countries
) => {
  const newActivity = await Activity.create({
    name,
    difficulty,
    duration,
    season,
  });

  console.log(countries);

  const countriesDB = await Country.findAll({
    where: {
      name: countries,
    },
  });

  await newActivity.setCountries(countriesDB);
};

const getActivities = async () => {
  const activities = await Activity.findAll({
    include: {
      model: Country,
      through: {
        attributes: [],
      },
    },
  });
  return activities;
};

module.exports = { createActivity, getActivities };
