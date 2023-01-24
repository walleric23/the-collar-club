




// const newFormHandler = async (event) => {
//   event.preventDefault();

//   const name = document.querySelector('#project-name').value.trim();
//   const needed_funding = document.querySelector('#project-funding').value.trim();
//   const description = document.querySelector('#project-desc').value.trim();

//   if (name && needed_funding && description) {
//     const response = await fetch(`/api/projects`, {
//       method: 'POST',
//       body: JSON.stringify({ name, needed_funding, description }),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (response.ok) {
//       document.location.replace('/profile');
//     } else {
//       alert('Failed to create project');
//     }
//   }
// };



const updateButtonHandler = async(event) => {
 event.preventDefault();
  if (event.target.hasAttribute('providerCheck')) {
     const provider = event.target.getAttribute('providerCheck');
    console.log("is provider is showing" + provider);
    if(provider === "false"){
      document.location.replace("/userupdate");
    }else{
      console.log("is provider is showing" + provider);
      document.location.replace("/providerupdate");
    }
  }
  
};

const becomeProviderButtonHandler = async (event) => {
  event.preventDefault();
 // TODO: add code to run put to user to change isProvider true
 const isProvider = true;
 const response = await fetch("/api/users/updateisprovider", {
   method: "PUT",
   body: JSON.stringify({ isProvider }),
   headers: { "Content-Type": "application/json" },
 }); 

  if (response.ok) {
     document.location.replace("/providersignup");
    } else {
      alert("Failed to change isProvider status");
    }
  
};

document  
 .querySelector('#updateProfile')
 .addEventListener('click', updateButtonHandler);

document
 .querySelector("#becomeProvider")
 .addEventListener("click", becomeProviderButtonHandler);

// document
//   .querySelector('.new-project-form')
//   .addEventListener('submit', newFormHandler);




 