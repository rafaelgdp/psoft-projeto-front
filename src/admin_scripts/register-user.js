const https = require('http')

const data = JSON.stringify({
        firstName: "Rafael",
        lastName: "Pontes",
        email: "a",
        password: "a"
    }
)

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/v1/auth/register',
  method: 'POST',
  mode: "no-cors",
  cache: "no-cache",
  credentials: 'same-origin',
  headers: {
      "Content-type": "application/json",
      "Access-Control-Allow-Origin": "*",
      'Content-Length': data.length
  }
}

const req = https.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })

})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()