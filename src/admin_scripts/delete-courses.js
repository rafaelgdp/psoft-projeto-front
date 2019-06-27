const https = require('http')

function deleteCourses() {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/v1/courses',
        method: 'DELETE',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
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

    req.end()
}

deleteCourses()