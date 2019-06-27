const https = require('http')

function getCoursesSubstring(subStr) {
    let data = JSON.stringify(encodeURIComponent(subStr))
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/v1/courses/find',
        method: 'POST',
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            'Content-Length': data.length
        }
    }

    const req = https.request(options, (res) => {
        console.log(`Enviei esta substring '${subStr}' e recebi o statusCode: ${res.statusCode}`)
        res.on('data', (d) => {
            process.stdout.write(d)
        })

    })

    req.on('error', (error) => {
        console.error(error)
    })
    
    req.write(data)
    req.end()
}

if (process.argv.length >= 3) {
    for (var i = 2; i < process.argv.length; i++) {
        console.log("Recebi este argumento: " + process.argv[i])
        getCoursesSubstring(process.argv[i])
    }
    
} else {
    console.log("Recebi nada...")
}
//getCoursesSubstring()