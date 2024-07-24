const registerURL = "https://localhost:7189/register"

let registerBtn = document.getElementById("registerBtn")

registerBtn.addEventListener("click", async (e) => {
    e.preventDefault()
    
    let email = document.getElementById('inputEmailRegister').value
    let password = document.getElementById('inputPasswordRegister').value

    console.log(email)
    console.log(password)
    
    let res = await fetch(registerURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
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