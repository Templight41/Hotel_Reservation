// removing default action of form
document.querySelector('form').addEventListener("submit", (e) => {
    e.preventDefault();
})

document.querySelector('button').style.cursor = "pointer";

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
        document.querySelector('#error-message').innerHTML = res.data.status;
        document.querySelector('#error-message-container').className += " error-message-container-visible";
        if(res.data.status === "link sent to the given email!") {
          document.querySelector('button').disabled = true;
          document.querySelector('button').style.cursor = "not-allowed";
          document.querySelector('button').style.backgroundColor = "grey";
        }
      })
});