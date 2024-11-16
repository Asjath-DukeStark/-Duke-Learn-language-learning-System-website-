let validatedEmail = false;
let inputs = false;
let usrName;
let password;
let gender;
let education;


function validateEmail() {
    let email = document.getElementById("email").value;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailFormat)) {
        window.alert("Email is not valid.");
    } else {
        validatedEmail = true;
    }
}

function validateTextInputs() {
  validateEmail();
  usrName = document.getElementById("username").value;
  password = document.getElementById("password").value;
  gender = document.querySelector(".gender").value; // Use querySelector to select the gender dropdown
  education = document.querySelector(".education").value;

  if (usrName === "") {
        alert("Please enter a username");
        inputs = false;
  } else if (password === "") {
        alert("Please enter a password");
        inputs = false;
  } else if(gender ==="default") {
        alert("choose gender");
        inputs = false;
  } else if(education ==="default") {
        alert("Choose an education");
        inputs = false;
  } else {
        inputs = true; // Set inputs to true only if both username and comment are not empty
  }
}

function openPopup(message) {
    document.getElementById("popup-message").innerHTML = message;
    document.getElementById("popup").style.display = "block";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("username").value = ""; // Reset username field
    document.getElementById("email").value = ""; // Reset email field
    document.getElementById("password").value = ""; // Reset comment field
    document.querySelector(".gender").value = "";
    document.querySelector(".education").value = "";

}

document.getElementById("submit").onclick = function(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    validateTextInputs();
  
    if (validatedEmail && inputs) {
      let message = "Dear " + usrName + ", Thank you for signing up!";
      openPopup(message);
    } else {
      closePopup(); // Close the popup if inputs are not valid
    }
  }


document.getElementById("closePopupBtn").onclick = function() {
    closePopup();
};

// Add click event listener to each option
document.querySelectorAll('.custom-select select option').forEach(option => {
  option.addEventListener('click', function() {
      // Remove previously selected class from all options
      document.querySelectorAll('.custom-select select option').forEach(opt => {
          opt.classList.remove('selected');
      });
      // Add selected class to clicked option
      this.classList.add('selected');
  });
});
