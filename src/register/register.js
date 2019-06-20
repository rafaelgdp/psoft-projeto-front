var ajax = new XMLHttpRequest();

function getURL(host, port, uri) {
    return "http://" + host + ":" + port + uri;
}

document.getElementById("submitBtn").onclick = register;


function register() {

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password
    };

    console.log("Entrei na function com " + JSON.stringify(user));

    let host = 'localhost'
    let port = 8080
    let registerUri = '/v1/auth/register'

    let httpRequest = {
        method: "POST",
        mode: "no-cors",
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(user)
    }

    fetch(getURL(host, port, registerUri), httpRequest)
        .then((response) => {
            console.log("here")
            console.log(response)
            return response.json()
        })
        .then((data) => {
            console.log('Request succeeded with JSON response', data);
        })
        .catch((error) => {
            console.log('Request failed!!!!! ', error);
        });

}

// Cria um evento para receber o retorno.
ajax.onreadystatechange = function() {
    // Caso o state seja 4 e o http.status for 200, é porque a requisiçõe deu certo.
	if (ajax.readyState == 4 && ajax.status == 200) {
		var data = ajax.responseText;
        // Retorno do Ajax
        console.log("Retorno do backend: ");
        console.log(data);}
}