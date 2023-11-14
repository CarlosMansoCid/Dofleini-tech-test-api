const {Router} = require('express')
const router = Router()
const RolesController = require('../controllers/roles.controller')
const validateAndAdapteInputData = require('../middlewares/validateAndAdapteInputData')

router.get('/', RolesController.getAll)
router.get('/:id', RolesController.getById)

router.post('/', validateAndAdapteInputData, RolesController.createRole)

router.delete('/:id', RolesController.deleteRole)

router.patch('/', RolesController.addPermissions)

router.put('/:id', RolesController.clearAllPermissions)
router.put('/', RolesController.addOnePermissionAtAllRoles)

module.exports = router