var imported = document.createElement('script');
imported.src = '../utils.js';
document.head.appendChild(imported);

document.getElementById("entrarBtn").onclick = function () {

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let user = {
        "email": email,
        "password": password
    };

    let host = 'localhost'
    let port = 8080
    let registerUri = '/v1/auth/login'

    let httpRequest = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    }

    let ok = false

    fetch(getURL(host, port, registerUri), httpRequest)
        .then((response) => {
            ok = response.ok
            if (response.status == 400) {
                alert("Usuário e/ou senha incorreto(s)!")
            }
            return response.json()
        })
        .then((data) => {
            if (ok) {
                window.localStorage.setItem("token", data.token);
                alert("Logado com sucesso!")
            }
        })
        .catch((error) => {
            console.log('Request failed: ', error);
        });
}

