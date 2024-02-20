const {Router} = require('express')

const {getCountriesHandler, getCountryDetailHandler} = require('../handlers/countryHandler')

const router = Router()


router.get('/', getCountriesHandler)
router.get('/:id', getCountryDetailHandler)

module.exports = router