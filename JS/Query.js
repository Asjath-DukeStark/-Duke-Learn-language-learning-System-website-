let validatedEmail = false;
let inputs = false;
let usrName;
let comment;

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
  usrName = document.getElementById("username").value;
  comment = document.getElementById("comment").value;
  if (usrName === "") {
      alert("Please enter a username");
      inputs = false;
  } else if (comment === "") {
      alert("Please enter a comment");
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
    document.getElementById("comment").value = ""; // Reset comment field
    document.getElementsByClassName("theme").value = "default"; // Reset select theme
}

document.getElementById("submit").onclick = function(event) {
  event.preventDefault(); // Prevent the default form submission behavior

  validateEmail();
  validateTextInputs();

  let selectedTheme = document.querySelector(".theme").value; // Get the selected theme value


  if (validatedEmail && inputs && selectedTheme !== "default") {
        let message = "Dear " + usrName + ", Thank you very much for your feedback. Your comment was: " + comment + " under the subject of " + selectedTheme;
        openPopup(message);
      } else if (selectedTheme === "default") {
        alert("Please select a theme other than default.");
        closePopup(); // Close the popup if theme is default
      } else {
        closePopup(); // Close the popup if inputs are not valid
      }
}


document.getElementById("closePopupBtn").onclick = function() {
    closePopup();
};
