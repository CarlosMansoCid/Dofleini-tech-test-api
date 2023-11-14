const Errors = require('../errors/errors')
const Messages = require('../messages/messages')
const EntitiesModel = require('../apps/entities/models/entity.model')

class EntityUseCases{
    constructor(){}

    static async getOneEntity(id){
        try{
            const entity = await EntitiesModel.findById(id)
            
            
            if(!entity){
                return Messages.errorMessage(400,Errors.infoDontExistInDb)
            }   

            return Messages.sucessfullMesage(200,{entity:entity})

        }catch{
            return Messages.errorMessage(500,Errors.genericServerError) 
        }
    }
    static async getAllEntities(){
        try{
            const entities = await EntitiesModel.find()
            if(!!entities) return Messages.sucessfullMesage(200, {entities:entities})
            return Messages.sucessfullMesage(200, {entities:[]})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }

    }
    static async createEntity(name, permissions){
        try{
            const entityAllreadyExist = await EntitiesModel.findOne({name:name})

            if(!!entityAllreadyExist) return Messages.errorMessage(400,Errors.infoAllreadyExistInDb)
            const newEntity = new EntitiesModel({
                name: name,
                permissions: permissions
            })

            await newEntity.save()

            return Messages.sucessfullMesage(201,{entity:newEntity})

        }catch{
            return Messages.errorMessage(500,Errors.genericServerError)

        }

    }
    static async deleteEntity(id){
        try{

            const deletedEntity = await EntitiesModel.findByIdAndDelete(id)

            if(!deletedEntity) return Messages.errorMessage(400,Errors.infoDontExistInDb)

            return Messages.sucessfullMesage(200,{entity: deletedEntity})
        }catch{
            return Messages.errorMessage(500,Errors.genericServerError)
        }

    }
    static async deleteEntityPermissions(id, permissions){
        try{

            const entity = await EntitiesModel.findById(id)

            if(!entity) return Messages.errorMessage(400,Errors.infoDontExistInDb)

            const currentEntityPermissions = entity.permissions

            const toEliminateValues = new Set(permissions)

            let filteredsPermissions = currentEntityPermissions.filter(currentPermission => {

                return !toEliminateValues.has(currentPermission)

            })

            if(filteredsPermissions.length === currentEntityPermissions.length) return Messages.errorMessage(400,Errors.badInfo)

            entity.permissions = filteredsPermissions

            await entity.save()

            return Messages.sucessfullMesage(200,{entity:entity})

        }catch{

            return Messages.errorMessage(500,Errors.genericServerError)

        }

    }
    static async addPermissions(id, permissions){
        try{

            const entity = await EntitiesModel.findById(id)

            let toAddPermissions = new Set(permissions)

            let filteredsPermissions = entity.permissions.filter(currentPermission => {

                return toAddPermissions.has(currentPermission)

            })

            if(filteredsPermissions.length !== 0) return Messages.errorMessage(400,Errors.badInfo)

            entity.permissions = [...entity.permissions, ...permissions]

            entity.save()

            return Messages.sucessfullMesage(200,{entity:entity})

        }catch{

            return Messages.errorMessage(500,Errors.genericServerError)

        }

    }
    static async getAllTheEntitiesWithReadPermission(){
        try{    
            let entities = await EntitiesModel.find()
            if(!entities) return Messages.sucessfullMesage(200,{entities:[]})
            

            if(entities.length === 0) return Messages.sucessfullMesage(200,{entities:[]})

            let filteredsEntities = []
            entities.forEach(entity =>{ 
                entity.permissions?.forEach(permission =>{
                    if(permission?.includes('READ')){
                        filteredsEntities.push(`${entity.name}:${permission}`)
                    }
                })
            })
            return Messages.sucessfullMesage(200,filteredsEntities)
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
}

module.exports = EntityUseCases