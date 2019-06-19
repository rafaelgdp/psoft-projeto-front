var ajax = new XMLHttpRequest();

let host = 'localhost'
let port = 8080
let registerUri = '/v1/auth/register'

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

    fetch(getURL(host, port, registerUri), {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(user)
    })  .then((response) => response.json())
        .then(function (data) {
            console.log('Request succeeded with JSON response', data);
        })
        .catch(function (error) {
            console.log('Request failed', error);
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