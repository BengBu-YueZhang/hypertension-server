const redis = require("redis")
const HOST = process.env.HOST
const client = redis.createClient({
  host: HOST,
  port: 6379,
  password: 'root'
})

client.on("error", (err) => {
  console.log('Error ' + err)
})

client.on("connect", () => {
  console.log('redis已链接')
})

module.exports = client
