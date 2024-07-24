const loginURL = "https://localhost:7189/login"

let loginBtn = document.getElementById("loginBtn")


loginBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    
    let email = document.getElementById('inputEmailLogin').value
    let password = document.getElementById('inputPasswordLogin').value


    let res = await fetch(loginURL, {
        method: "POST",
        credentiasl: "include",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json'
        },
        body : JSON.stringify({
            email: email,
            password: password
        })
    }); 


    if(res.ok)
        console.log("OK")
    else console.log("ERROR")
});

