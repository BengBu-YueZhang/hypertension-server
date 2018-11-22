const redis = require("redis")
const client = redis.createClient({
  host: '47.91.246.74',
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
