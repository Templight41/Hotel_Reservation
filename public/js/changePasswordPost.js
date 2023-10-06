document.querySelector('button').addEventListener("click", (e) => {
    axios.post(window.location.href, {
        password: document.querySelector("#password").value,
        type: "reset",
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((res) => {
        document.querySelector('button').setAttribute("disabled", true);
        document.querySelector('button').style.backgroundColor = "grey"
        document.querySelector('button').style.cursor = "not-allowed";
        document.querySelector('#error-message').innerHTML = res.data.status;
        document.querySelector('#error-message-container').className += " error-message-container-visible";
      })
});