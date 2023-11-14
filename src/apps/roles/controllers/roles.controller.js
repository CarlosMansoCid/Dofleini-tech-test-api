const RolesUseCases = require('../../../useCases/rolesUseCases')
const Errors = require('../../../errors/errors')
class RolesController extends RolesUseCases{

    static async getById(req, res){
        const {id} = req.params

        if(!id) return res.status(400).json(Errors.badInfo)

        const response = await super.getOneById(id)
        if(!response.ok) return res.status(response.code).json(response.error)
        return res.status(response.code).json(response.payload)
    }
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
    static async deleteRole(req, res){
        const {id} = req.params
        
        if(!id) return res.status(400).json(Errors.badInfo)

        const response = await RolesUseCases.deleteById(id)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }
    static async addPermissions(req, res){
        const {permissions, id} = req.body

        if(!permissions || !id) return res.status(400).json(Errors.badInfo)

        const response = await super.addPermissions(permissions, id)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }
    static async clearAllPermissions(req, res){
        const {id} = req.params
        const response = await RolesUseCases.clearAllPermissions(id)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }
    static async addOnePermissionAtAllRoles(req, res){
        const {permission} = req.body
        if(!permission) return res.status(400).json(Errors.badInfo)
        
        const response = await super.addOnePermissionAtAllRoles(permission)

        if(!response.ok) return res.status(response.code).json(response.error)
        return res.status(response.code).json(response.payload)
    }
}

module.exports = RolesController