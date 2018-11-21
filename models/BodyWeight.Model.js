const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BodyWeightSchema = new Schema({
  createAt: {
    type: Date,
    default: new Date()
  },
  weight: {
    type: Number,
    required: true
  },
  bmi: {
    type: Number,
    required: true
  }
})

BodyWeightSchema.options.toObject = {
  transform (doc, ret) {
    ret.id = doc._id
    delete ret._id
    return ret
  }
}

const BodyWeight = mongoose.model('BodyWeight', BodyWeightSchema)

module.exports = BodyWeight