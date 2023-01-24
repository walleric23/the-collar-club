


const saveUpdateFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const profilePicture = document.querySelector("#uploadedimage").src;

  console.log(name, email, profilePicture);
  if (name && email) {
    const response = await fetch("/api/users/update", {
      method: "PUT",
      body: JSON.stringify({ name, email, profilePicture }),
      headers: { "Content-Type": "application/json" },
    });
console.log("response:" + response);
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("update didn't save - Email must be unique - All fields filled in");
    }
  }
};
  

document
  .querySelector("#save-changes")
  .addEventListener("click", saveUpdateFormHandler);
