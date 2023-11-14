const Errors = require('../errors/errors')
const Messages = require('../messages/messages')
const RolesModel = require('../apps/roles/models/roles.model')

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

}
module.exports = RolesUseCases
