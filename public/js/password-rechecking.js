let firstPass = document.querySelector("#password");
let secondPass = document.querySelector("#re-password");
let logSignButton = document.querySelector("#signin-button");
let emailInput = document.querySelector("#email");
let nameInput = document.querySelector("#name");
let firstValue;
let secondValue;
let blueBackgroundValue = "rgb(23, 100, 253)"
let isCorrectEmail;

logSignButton.setAttribute("disabled", true);
logSignButton.style.backgroundColor = "grey"
logSignButton.style.cursor = "not-allowed";

firstPass.addEventListener("input", (e) => {
    firstValue = e.target.value;
    check()
})

secondPass.addEventListener("input", (e) => {
    secondValue = e.target.value;
    check()
})

emailInput.addEventListener("input", async (e) => {
  await validate()
  await check()
})

nameInput.addEventListener("input", (e) => {
  nameValue = e.target.value;
  check()
})

function check() {
    if(firstValue!==secondValue || firstValue == "" || secondValue=="" || firstValue==undefined || secondValue==undefined || nameValue=="") {
        logSignButton.setAttribute("disabled", true);
        logSignButton.style.backgroundColor = "grey"
        logSignButton.style.cursor = "not-allowed";
    }
    else if(!isCorrectEmail) {
        logSignButton.setAttribute("disabled", true);
        logSignButton.style.backgroundColor = "grey"
        logSignButton.style.cursor = "not-allowed";
    }
    else {
        logSignButton.removeAttribute("disabled", true);
        logSignButton.style.backgroundColor = blueBackgroundValue
        logSignButton.style.cursor = "not-allowed";
    }
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const validate = () => {
  const email = $('#email').val();

  if(validateEmail(email)){
    isCorrectEmail = true;
  } else{
    isCorrectEmail = false;
  }
  return false;
};