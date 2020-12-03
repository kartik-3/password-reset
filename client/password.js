function validateEmail(mail) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(mail).toLowerCase());
}

const checkUser = async (mail) => {
  const response = await fetch(
    "ttps://password-reset-kartik.herokuapp.com/email",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: mail }),
    }
  );
  return response;
};

document
  .querySelector("#reset-password-btn")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    if (validateEmail(email)) {
      checkUser(email).then((response) => {
        if (response.status != 404) {
          swal({
            text:
              "A verification link has been sent to your mail id. Please click on that link.",
          });
        } else {
          swal({ text: "User does not exist." });
        }
      });
    } else {
      $("#email").popover("show");

      setTimeout(function () {
        $("#email").popover("hide");
      }, 5000);
    }
  });
