const axios = require("axios");
const server = require("./src/server");
const { conn, Country } = require("./src/db.js");
const PORT = 3001;

conn
  .sync({ force: true })
  .then(() => {
    server.listen(PORT, async () => {
      const raw = await axios.get("http://localhost:5000/countries");

      const countries = raw.data.map((country) => {
        return {
          id: country.cca3,
          name: country.name.common,
          image: country.flags.png,
          continent: country.region,
          capital: !country.capital ? "Not found" : country.capital[0],
          subregion: country.subregion,
          area: country.area,
          population: country.population,
        };
      });

      await Country.bulkCreate(countries);

      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
