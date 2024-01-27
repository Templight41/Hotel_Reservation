// removing default action of form
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
})

// sending POST request to server
document.querySelector('button').addEventListener("click", (e) => {
    axios.post('/create-account', {
        name: document.querySelector("#name").value,
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
        type: "create-account",
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        if (res.data.status == "success") {
            window.location.href = "/booking/new"
        } else if(res.data.status == "Account already exists") {
            document.querySelector('#error-message').innerHTML = res.data.status;
            document.querySelector('#error-message-container').className += " error-message-container-visible";
        }
      })
});