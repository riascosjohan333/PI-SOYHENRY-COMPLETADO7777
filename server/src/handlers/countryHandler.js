const {
  getCountries,
  getCountriesName,
  getCountryDetail
} = require("../controllers/countryController");

const getCountriesHandler = async (req, res) => {
  const { name } = req.query;
  try {
    const dogs = name ? await getCountriesName(name) : await getCountries();

    dogs.length
      ? res.status(200).json(dogs)
      : res.status(404).send("404 - Not Found");
  } catch (error) {
    console.log(error.message);
  }
};

const getCountryDetailHandler = async (req, res) => {
    const {id} = req.params

    try {
        const detail = await getCountryDetail(id)
        detail? res.status(200).json(detail) : res.status(404).send("404 - We couldn't found it")
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = { getCountriesHandler, getCountryDetailHandler };
