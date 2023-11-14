const {Router} = require('express')
const router = Router()
const RolesController = require('../controllers/roles.controller')
const validateAndAdapteInputData = require('../middlewares/validateAndAdapteInputData')

router.get('/', RolesController.getAll)

router.post('/', validateAndAdapteInputData, RolesController.createRole)

module.exports = router