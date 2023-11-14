const EntityModel = require('../models/entity.model')
const Errors = require('../../../errors/errors')
const PermissionValidator = require('../middlewares/permisionValidator.middleware')
const UseCases = require('../../../useCases/entityUseCases')

class EntitiesController extends UseCases{

    
    
    static async getOne (req, res){
        
        const {id} = req.params

        if(!id) return res.status(400).json(Errors.badInfo)
        
        const response = await super.getOneEntity(id)
        
        if(!response.ok) return res.status(response.code).json(response.error)
        
        return res.status(response.code).json(response.payload)
    }

    static async getAll (req, res){
        const response = await super.getAllEntities()

        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)
    }

    static async createEntity (req, res){
        const {name, permissions} = req.body
        
        const response = await super.createEntity(name, permissions)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)
        
    }

    static async deleteEntity (req, res){
        const {id} = req.params
        
        if(!id) return res.status(400).json(Errors.badInfo)

        const response = await super.deleteEntity(id)

        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }

    static async deleteEntityPermissions (req, res){
        const {id} = req.params
        const {permissions} = req.body

        if(!id || !permissions) return res.status(400).json(Errors.badInfo)
        if(permissions.length === 0) return res.status(400).json(Errors.badInfo)
        
        const response = await super.deleteEntityPermissions(id, permissions)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }

    static async addPermissions (req, res){
        const {id} = req.params
        const {permissions} = req.body

        if(permissions.length === 0) return res.status(400).json(Errors.badInfo)
        const response = await super.addPermissions(id, permissions)
        if(!response.ok) return res.status(response.code).json(response.error)

        return res.status(response.code).json(response.payload)

    }
}

module.exports = EntitiesController