let errorStatus = document.querySelector(".error-message-status");
let errorMessageContainer = document.querySelector("#error-message-container")

console.log(errorStatus.innerHTML)

if(errorStatus.innerHTML == "true") {
    errorMessageContainer.className += " error-message-container-visible";
}