// removing default action of form
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
})

// sending POST request to server
document.querySelector('button').addEventListener("click", (e) => {
    axios.post('/reset-password', {
        email: document.querySelector("#email").value,
        type: "reset",
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