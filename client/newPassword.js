const checkString = (rand) => {
  const response = fetch(
    `ttps://password-reset-kartik.herokuapp.com/email/${rand}`
  );
  return response;
};

(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("mail");
  const rand = urlParams.get("rand");
  checkString(rand).then((response) => {
    if (response.status == 404)
      swal({ text: "Verification failed. Please try again later." });
    else if (response.status == 200) {
      document.querySelector("#main-container").classList.remove("d-none");
      document.querySelector("#email").value = email;
    } else swal({ text: "Some error occurred. Please try again later." });
  });
})();

document.querySelector("#confirm-password").addEventListener("click", () => {
  const pw1 = document.querySelector("#change-password").value;
  const pw2 = document.querySelector("#change-confirm-password").value;
  const email = document.querySelector("#email").value;

  if (pw1 !== pw2) {
    swal({ text: "Passwords don't match!" });
  } else {
    const data = {
      email: email,
      password: pw1,
    };

    updateUser(data).then((response) => {
      if (response.status != 200) {
        swal({ text: "Some error occurred. Please try again later." });
      } else {
        swal({ text: "Password changed successfully!" });
      }
    });
    document.querySelector("#show-change-password").classList.add("d-none");
  }
});

const updateUser = async (data) => {
  const response = await fetch(
    "ttps://password-reset-kartik.herokuapp.com/email",
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response;
};
