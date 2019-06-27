const https = require('http')

function getAllCourses() {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/v1/courses/',
        method: 'GET',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
    }

    const req = https.request(options, (res) => {
        console.log(`Recebi o statusCode: ${res.statusCode}`)
        res.on('data', (d) => {
            process.stdout.write(d)
        })

    })

    req.on('error', (error) => {
        console.error(error)
    })
    
    req.end()
}

getAllCourses()