//FIXME:create the call to the signup create from event listener

const providerSignupFormHandler = async (event) => {
  event.preventDefault();

  const phone = document.querySelector("#phone-signup").value.trim();
  const city = document.querySelector("#location-signup").value.trim();
  const dogWalk = document.querySelector("#dogwalk-signup").checked;
  const dogFeed = document.querySelector("#dogfeeding-signup").checked;
  const sTDogSit = document.querySelector("#STdogSitting-signup").checked;
  const lTDogSit = document.querySelector("#LTdogSitting-signup").checked;
  const smallDog = document.querySelector("#smallDog-signup").checked;
  const medDog = document.querySelector("#medDog-signup").checked;
  const largeDog = document.querySelector("#largeDog-signup").checked;
  const profilePicture = document.querySelector("#uploadedimage").src;

  console.log(phone, city);
  if (phone && city) {
    const response = await fetch("/api/providers", {
      method: "POST",
      body: JSON.stringify({ phone, city, dogWalk,dogFeed, sTDogSit, lTDogSit,small:smallDog, medium:medDog, large:largeDog}),
      headers: { "Content-Type": "application/json" },
    });
 
     const response2 = await fetch("/api/users/update", {
      method: "PUT",
      body: JSON.stringify({ profilePicture }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok && response2.ok) {
      document.location.replace("/profile");
    } else {
      alert("failed to create/update provider info - make sure you have filled in phone and city");
    }
  }
};

 document
   .querySelector("#sign-up")
   .addEventListener("click", providerSignupFormHandler);