const mongoose = require('mongoose')

const entitySchema = new mongoose.Schema({
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

const entityModel = mongoose.model('Entity', entitySchema);

module.exports = entityModel;