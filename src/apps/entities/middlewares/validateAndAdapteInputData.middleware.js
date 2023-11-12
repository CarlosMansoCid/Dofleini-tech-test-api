const Errors = require('../../../errors/errors')
const regex = require('../../../utils/regex/entityRegex')

const validateAndAdapteInputData = (req, res, next) =>{
    const {name, permissions} = req.body

    if(!name || !permissions) return res.status(400).json(Errors.infoMissedError)
    if(typeof name !== 'string' || !Array.isArray(permissions)) return res.status(400).json(Errors.badInfo)

    
    

    if(!regex.moreThenOneWord.test(name.toUpperCase()) && !regex.simpleWord.test(name.toUpperCase())) {
        return res.status(400).json(Errors.badInfo) 
    }

    req.body.name = name.toUpperCase()

    
    if(!permissions.includes('READ')){
        req.body.permissions = [...permissions,'READ']
    }

    next()
}
module.exports = validateAndAdapteInputData
