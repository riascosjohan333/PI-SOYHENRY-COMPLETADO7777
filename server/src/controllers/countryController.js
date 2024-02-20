const { Country, Activity } = require("../db");

const getCountries = async () => {
  const countries = await Country.findAll({
    include: {
      model: Activity,
      through: {
        attributes: [],
      },
    },
  });
  return countries;
};

const getCountriesName = async (name) => {
  const countries = await getCountries();

  const countriesName = countries.filter((c) =>
    c.name.toLowerCase().includes(name.toLowerCase())
  );

  return countriesName;
};

const getCountryDetail = async (id) => {
  id = id.toUpperCase();
  try {
    const country = await Country.findByPk(id, {
      include: {
        model: Activity,
        through: {
          attributes: [],
        },
      },
    });
    return country;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = { getCountries, getCountriesName, getCountryDetail };
