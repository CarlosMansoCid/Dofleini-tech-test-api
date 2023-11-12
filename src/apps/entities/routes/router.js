const {Router} = require('express')
const Controller = require('../controllers/entities.controller')
const router = Router()
const validateAndAdapteInputData = require('../middlewares/validateAndAdapteInputData.middleware')



router.get('/', Controller.getAll)

router.use(validateAndAdapteInputData)
router.post('/', Controller.createEntity)



module.exports = router