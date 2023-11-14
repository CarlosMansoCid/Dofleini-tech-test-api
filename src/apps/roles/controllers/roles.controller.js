const RolesUseCases = require('../../../useCases/rolesUseCases')

class RolesController extends RolesUseCases{
    
    static async getAll(req, res){
        const response = await super.getAllRoles()

        if(!response.ok) return res.status(response.code).json(response.error)
        return res.status(response.code).json(response.payload)
    }
    static async createRole(req, res){
        const {name, permissions} = req.body
        const response = await super.createRole(name, permissions)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)
    }
}

module.exports = RolesController