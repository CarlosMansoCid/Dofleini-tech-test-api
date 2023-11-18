const regex = require('../../../utils/regex/entityRegex')
const Errors = require('../../../errors/errors')

const permissionValidator = (req, res, next) => {
    const {permissions} = req.body

    if(!permissions) return res.status(400).json(Errors.badInfo)
    if(new Set(permissions).size < permissions.length) return res.status(400).json(Errors.badInfo)

    const upperCasePermissions = permissions.map(permission => permission.toUpperCase())
       
    if(upperCasePermissions.length > 0){
        upperCasePermissions.forEach(permission => {
            if(!regex.moreThenOneWord.test(permission) && !regex.simpleWord.test(permission)){
                res.status(400).json(Errors.badInfo)
            }
        })

    }

    req.body.permission = upperCasePermissions
    next()
}

module.exports = permissionValidator