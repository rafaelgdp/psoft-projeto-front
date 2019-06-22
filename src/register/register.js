var imported = document.createElement('script');
imported.src = '../utils.js';
document.head.appendChild(imported);

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

    let host = 'localhost'
    let port = 8080
    let registerUri = '/v1/auth/register'

    let httpRequest = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    }

    let ok = false;

    fetch(getURL(host, port, registerUri), httpRequest)
        .then((response) => {
            if (response.status == 406) {
                alert("Já existe um usuário com esse email cadastrado!")
            } else {
                if (response.ok) {
                    ok = true
                } else {
                    alert("Ocorreu algum erro!")
                }
            }
            return response.json()
        })
        .then((data) => {
            if (ok) {
                alert("Usuário criado '" + data.email + "' com sucesso!")
            }
        })
        .catch((error) => {
            if (error.contains("There is")) {
                alert("Já existe um usuário com esse e-mail cadastrado(a)!")
            } else {
                alert("O pedido falhou!")
            }
            console.log('Request failed: ', error);
        });

}