// removing default action of form
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
})

// sending POST request to server
document.querySelector('button').addEventListener("click", (e) => {
    axios.post('/login', {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data.status == "password match") {
            window.location.href = "/booking"
        } else {
            document.querySelector('#error-message').innerHTML = res.data.status;
            document.querySelector('#error-message-container').className += " error-message-container-visible";
        }
      })
});