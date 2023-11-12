const Errors = require('../../../errors/errors')

const validateAndAdapteInputData = (req, res, next) =>{
    const {name, permissions} = req.body

    if(!name || !permissions) return res.status(400).json(Errors.infoMissedError)
    if(typeof name !== 'string' || !Array.isArray(permissions)) return res.status(400).json(Errors.badInfo)

    req.name = name.toUpperCase()
    const upperCasePermissions = permissions.map(permission => permission.toUpperCase())
    
    if(!upperCasePermissions.includes('READ')){
        req.permissions = [...upperCasePermissions,'READ']
    }else{
        req.permissions = upperCasePermissions
    }

    next()
}
module.exports = validateAndAdapteInputData