const {Router} = require('express')

const {createActivityHandler, getActivitiesHandler} = require('../handlers/activityHandler')

const router = Router()

router.post('/', createActivityHandler)
router.get('/', getActivitiesHandler)

module.exports = router