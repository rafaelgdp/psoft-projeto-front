const https = require('http')


function addComment(author, msg) {
  const data = JSON.stringify(
    {
      commentAuthor: {
        email: author,
      },
      message: msg
    }
  );

  const options = {
    hostname: 'localhost',
    port: 8080,
    path: '/v1/courses/comment?id=95',
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
      console.log();
    })

  })

  req.on('error', (error) => {
    console.error(error)
  })

  req.write(data)
  req.end()
}

let comments = [
  {
    author: "a",
    message: "oi1"
  },
  {
    author: "a",
    message: "oi2"
  },
  {
    author: "a",
    message: "oi3"
  },
  {
    author: "a",
    message: "oi4"
  }
]

for (c in comments) {
  addComment(comments[c].author, comments[c].message);
}