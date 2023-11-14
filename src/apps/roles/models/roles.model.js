const mongoose = require('mongoose')

const rolesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    permissions:{
        type: Array,
        required: true,
        default: []
    }
  });

const rolesModel = mongoose.model('Roles', rolesSchema);

module.exports = rolesModel;