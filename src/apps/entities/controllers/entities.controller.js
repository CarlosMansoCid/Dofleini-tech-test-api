const EntityModel = require('../models/entity.model')
const Errors = require('../../../errors/errors')
const PermissionValidator = require('../middlewares/permisionValidator.middleware')
class EntitiesController {
    static async getOne (req, res){
        const {id} = req.params
        
        if(!id) return res.status(400).json(Errors.badInfo)

        try{
            const entity = await EntityModel.findById(id)
            if(!entity){
                return res.status(400).json(Errors.infoDontExistInDb)
            }
            return res.status(200).json({entity})
        }catch{
            return res.status(500).json(Errors.genericServerError) 
        }
    }

    static async getAll (req, res){
        try{
            const entities = await EntityModel.find()
            if(!!entities){
                return res.status(200).json({entities: entities})
            }
            return res.status(200).json({entities: []})
        }catch{
            return res.status(500).json(Errors.genericServerError)
        }
    }

    static async createEntity (req, res){
        try{
            const entityAllreadyExist = await EntityModel.findOne({name:req.body.name})

            if(!!entityAllreadyExist) return res.status(400).json(Errors.infoAllreadyExistInDb)

            const newEntity = new EntityModel({
                name: req.body.name,
                permissions: req.body.permissions
            })

            await newEntity.save()

            return res.status(201).json({entity: newEntity})
        }catch{
            return res.status(500).json(Errors.genericServerError)
        }
        
    }

    static async deleteEntity (req, res){
        const {id} = req.params
        
        if(!id) return res.status(400).json(Errors.badInfo)

        try{
            const deletedEntity = await EntityModel.findByIdAndDelete(id)
            
            if(!deletedEntity){
                return res.status(400).json(Errors.infoDontExistInDb)
            }

            return res.status(200).json({entity: deletedEntity})

        }catch{
            return res.status(500).json(Errors.genericServerError)
        }
    }

    static async updateEntityPermisions (req, res){
        const {id} = req.params
        const {permissions} = req.body

        if(!id || !permissions) return res.status(400).json(Errors.badInfo)
        if(permissions.length === 0) return res.status(400).json(Errors.badInfo)
        

        try{
            const entity = await EntityModel.findById(id)

            if(!entity){
                return res.status(400).json(Errors.infoDontExistInDb)
            }

            const currentEntityPermissions = entity.permissions

            const toEliminateValues = new Set(permissions)

            let filteredsPermissions = currentEntityPermissions.filter(currentPermission => {
                return !toEliminateValues.has(currentPermission)
            })

            if(filteredsPermissions.length === currentEntityPermissions.length) return res.status(400).json(Errors.badInfo)

            entity.permissions = filteredsPermissions
            await entity.save()
            
            return res.status(200).json(entity)
        }catch{
            return res.status(500).json(Errors.genericServerError)
        }

    }

    static async addPermission (req, res){
        const {id} = req.params
        const {permissions} = req.body

        if(permissions.length === 0) return res.status(400).json(Errors.badInfo)

        try{
            const entity = await EntityModel.findById(id)

            // const filteredsPermissions = entity.permissions.filter(currentPermission =>{
            //     for(const permission of permissions){
            //         return currentPermission === permission
            //     }
            // })
            let toAddPermissions = new Set(permissions)
            let filteredsPermissions = entity.permissions.filter(currentPermission => {
                return toAddPermissions.has(currentPermission)
            })

            if(filteredsPermissions.length !== 0) return res.status(400).json(Errors.badInfo)

            entity.permissions = [...entity.permissions, ...permissions]
            entity.save()
            return res.status(200).json({entity})
        }catch{
            return res.status(500).json(Errors.genericServerError)
        }
    }
}

module.exports = EntitiesController