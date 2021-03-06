const mongoose = require('mongoose')
const db = mongoose.connection
const HOST = process.env.HOST

/**
 * warning: collection.ensureIndex is deprecated. Use createIndexes instead.
 * issues: https://github.com/Automattic/mongoose/issues/6890
 * mongoose.connect('mongodb://username:password@host:port/database?options...')
 */
module.exports = {
  connect () {
    mongoose.connect(`mongodb://note:12345678@${HOST}:27017/hypertension`, {
      useNewUrlParser: true
    })
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', () => {
      console.log('mongo已链接')
    })
  }
}