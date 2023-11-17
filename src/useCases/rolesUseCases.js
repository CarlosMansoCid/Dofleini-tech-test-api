const Errors = require('../errors/errors')
const Messages = require('../messages/messages')
const RolesModel = require('../apps/roles/models/roles.model')
const { getAllTheEntitiesWithReadPermission, getOneEntityByName } = require('./entityUseCases')
const getUniqueElementsInTwoArrays = require('../utils/functions/getUniqueElementsInTwoArrays')
const EntityUseCases = require('./entityUseCases')

class RolesUseCases {
    constructor(){}
    static async getOneById(id){
        try{
            const role = await RolesModel.findById(id)
            if(!role) return Messages.errorMessage(400,Errors.infoDontExistInDb)
            return Messages.sucessfullMesage(200,{role:role})
        }catch{
            return Messages.errorMessage(500,Errors.genericServerError) 
        }
    }
    static async deleteById(id){
        try{
            const deletedRole = await RolesModel.findByIdAndDelete(id)
            if(!deletedRole) return Messages.errorMessage(400, Errors.badInfo)
            return Messages.sucessfullMesage(200, {role:deletedRole})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
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
    static async addPermissions(permissions, id){
        console.log(permissions, id)
        try{
            const roleInDb = await RolesModel.findById(id)
            if(!roleInDb) return Messages.errorMessage(400, Errors.infoDontExistInDb)

            if(roleInDb.permissions.length === 0) {
                roleInDb.permissions = permissions
                await roleInDb.save()
                return Messages.sucessfullMesage(200, {role:roleInDb})
            }

            const uniquePermissions = getUniqueElementsInTwoArrays(permissions, roleInDb.permissions)
            if(uniquePermissions.length > 0){
                const newPermissions = [...uniquePermissions,...roleInDb.permissions]
                roleInDb.permissions = newPermissions
                await roleInDb.save()
                return Messages.sucessfullMesage(200, {role:roleInDb})
            }
            return Messages.errorMessage(400, Errors.badInfo)
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
    static async clearAllPermissions(id){
        try{
            const roleInDb = await RolesModel.findByIdAndUpdate(id, {permissions:[]}, {returnDocument:'after'})
            if(!roleInDb) return Messages.errorMessage(400, badInfo)
            return Messages.sucessfullMesage(200, {role:roleInDb})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
    static async addOnePermissionAtAllRoles(permission){
        const permissionSplit = permission.split(':')
        const [entity, inputPermission] = permissionSplit

        try{
            const entityInDb = await getOneEntityByName(entity)
            if(!entityInDb.ok) return Messages.errorMessage(400, Errors.badInfo)
            

            console.log(entityInDb.payload.entity.permissions.indexOf(inputPermission))
            const thePermissionExistInEntity = entityInDb.payload.entity.permissions.indexOf(inputPermission)
            if(thePermissionExistInEntity === -1) return Messages.errorMessage(400, Errors.badInfo)

            const roles = await RolesModel.find()
            if(!roles || roles.lenth === 0) return Messages.errorMessage(400, Errors.badInfo)

            roles.forEach(async role =>{
                if(role.permissions.indexOf(permission) === -1){
                    role.permissions.push(permission)
                    await role.save()
                }
            })

            return Messages.sucessfullMesage(200, {roles:roles})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }

    }
    static async deletePermissions(permissions, id){
        try{
            const role = await RolesModel.findById(id)
            if(!role) return Messages.errorMessage(400,Errors.infoDontExistInDb)
            const filteredsPermissions = getUniqueElementsInTwoArrays(role.permissions, permissions)
            role.permissions = filteredsPermissions
            await role.save()
            return Messages.sucessfullMesage(200,{role:role})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }
    static async addAllPermissionsFromAEntityToAllRoles(entityId){
        try{
            const entity = await EntityUseCases.getOneEntity(entityId)
            if(!entity) return Messages.errorMessage(400, Errors.badInfo)

            const allRoles = await RolesModel.find()
            if(!allRoles) return Messages.errorMessage(400, Errors.infoDontExistInDb)

            const entityPermissions = entity.payload.entity.permissions

            const rolesId = allRoles.map(role => {return role.id})
            if(!rolesId) return  Messages.errorMessage(500, Errors.genericServerError)

            for(let roleId of rolesId){
                const resp = await RolesUseCases.addPermissions(entityPermissions, roleId)
                console.log(resp)
                if(!resp.ok) return Messages.errorMessage(500, Errors.genericServerError)
            }
            return Messages.sucessfullMesage(204, {})
        }catch{
            return Messages.errorMessage(500, Errors.genericServerError)
        }
    }

}
module.exports = RolesUseCases
