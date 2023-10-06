let firstPass = document.querySelector("#password");
let secondPass = document.querySelector("#re-password");
let logSignButton = document.querySelector("#signin-button");
let errorMessage = document.querySelector("#error-message");

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
})

logSignButton.addEventListener("click", () => {
    if(firstPass.value !== secondPass.value) {
        errorMessage.innerHTML = "Passwords do not match"
        return;
    } else {
        errorMessage.innerHTML = ""
        axios.post(window.location.href, {
            password: firstPass.value
        }).then((response) => {
            if(response.data.status === "success") {
                window.location.href = "/login"
            }
        }).catch((err) => {
            console.log(err)
        })
    }
})