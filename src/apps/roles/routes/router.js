const {Router} = require('express')
const router = Router()
const RolesController = require('../controllers/roles.controller')

router.get('/', RolesController.getAll)

module.exports = router