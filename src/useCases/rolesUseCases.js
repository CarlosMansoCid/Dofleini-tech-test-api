const Errors = require('../errors/errors')
const Messages = require('../messages/messages')
const RolesModel = require('../apps/roles/models/roles.model')
const { getAllTheEntitiesWithReadPermission } = require('./entityUseCases')

class RolesUseCases {
    constructor(){}

    static async getAllRoles(){
        try{
            const roles = await RolesModel.find()

            if(!!roles) return Messages.sucessfullMesage(200, {roles:roles})

            return Messages.sucessfullMesage(200, {roles:[]})

        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
    static async createRole(name, permissions){
        try{
            const roleAllreadyExist = await RolesModel.findOne({name:name})
            if(!!roleAllreadyExist) return Messages.errorMessage(400,Errors.infoAllreadyExistInDb)

            const entitiesWithReadPermission = await getAllTheEntitiesWithReadPermission()

            if(entitiesWithReadPermission.ok){
                let newRole = new RolesModel({
                    name: name,
                    permissions: [...permissions, ...entitiesWithReadPermission.payload]
                })
                    
                await newRole.save()
                return Messages.sucessfullMesage(201,{role: newRole})
            }
            return Messages.errorMessage(500, Errors.genericServerError)


        }catch{
            return Messages.errorMessage(500,Errors.genericServerError)
        }

    }

}
module.exports = RolesUseCases
