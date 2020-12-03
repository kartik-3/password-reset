function validateEmail(mail) {
  const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(mail).toLowerCase());
}

const createUser = async (data) => {
  const response = await fetch("http://localhost:8000/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

document.querySelector("#sign-up-btn").addEventListener("click", () => {
  const email = document.querySelector("#email").value;
  if (!validateEmail(email)) {
    $("#email").popover("show");
    setTimeout(function () {
      $("#email").popover("hide");
    }, 5000);
  } else {
    $("#sign-up-modal").modal("show");
  }
});

document
  .querySelector("#save-create-password")
  .addEventListener("click", () => {
    const pw1 = document.querySelector("#create-password").value;
    const pw2 = document.querySelector("#create-confirm-password").value;
    const email = document.querySelector("#email").value;

    if (pw1 !== pw2) {
      swal({ text: "Passwords don't match!" });
    } else {
      const data = {
        email: email,
        password: pw1,
      };

      createUser(data).then((response) => {
        if (response.status != 200) {
          swal({ text: "User already exists." });
        } else {
          swal({ text: "Signed up successfully!" });
        }
      });
    }
  });
