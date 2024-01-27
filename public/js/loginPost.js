//getting "from" query
const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
let value = params.from;
if(!params.from) {
  value = "/profile"
}

// removing default action of form
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
})

document.querySelector("#email").addEventListener("input", (e) => {
  if (document.querySelector("#password").value != "" && document.querySelector("#email").value != "") {
    document.querySelector('button').disabled = false;
    document.querySelector('button').className = "";
  } else {
    document.querySelector('button').className += " signin-button-disabled";
    document.querySelector('button').disabled = false;
  }
})

document.querySelector("#password").addEventListener("input", (e) => {
  if (document.querySelector("#password").value != "" && document.querySelector("#email").value != "") {
    document.querySelector('button').disabled = false;
    document.querySelector('button').className = "";
  } else {
    document.querySelector('button').className += " signin-button-disabled";
    document.querySelector('button').disabled = true;
  }
})

document.querySelector('button').className += " signin-button-disabled";
document.querySelector('button').disabled = true;

// sending POST request to server
document.querySelector('button').addEventListener("click", (e) => {
    axios.post('/login', {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        type: "login",
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data.status == "password match") {
            window.location.href = value
        } else {
            document.querySelector('#error-message').innerHTML = res.data.status;
            document.querySelector('#error-message-container').className += " error-message-container-visible";
        }
      })
});