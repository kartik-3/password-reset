document
  .querySelector("#reset-password-btn")
  .addEventListener("click", (event) => {
    const email = document.querySelector("#email").value;
    console.log(email);
    if (validateEmail(email)) {
      console.log(1)
      fetch(checkUser(email)).then((response) => {
        alert(response);
        if (response.status != 404) {
          event.preventDefault();
        }
        //console.log(response);
        //event.preventDefault();
      });
      // if (!200) {
      // swal({ text: "User does not exist." });

      //  }
    } else {
      $("#email").popover("show");

      setTimeout(function () {
        $("#email").popover("hide");
      }, 5000);
    }
    // }
  });

const checkUser = async (mail) => {
  console.log(mail);
  const response = await fetch("http://localhost:8000/email", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: mail }),
  });
  return response.json();
};

function validateEmail(mail) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(mail).toLowerCase());
}
