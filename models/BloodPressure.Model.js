const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BloodPressureSchema = new Schema({
  createAt: {
    type: Date,
    default: new Date()
  },
  h: {
    type: Number,
    required: true
  },
  l: {
    type: Number,
    required: true
  }
})

BloodPressureSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const BloodPressure = mongoose.model('BloodPressure', BloodPressureSchema)

module.exports = BloodPressure