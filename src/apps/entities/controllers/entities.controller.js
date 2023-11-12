const EntityModel = require('../models/entity.model')
const Errors = require('../../../errors/errors')

class EntitiesController {

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
        console.log(req.permissions)
        return res.status(201).end()
    }
}

module.exports = EntitiesController