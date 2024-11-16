const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        if (validateForm()) {
            // Form is valid, submit it
            form.submit();
        }
    });
});

function validateForm() {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    let isValid = true;

    // Clear all error messages
    clearErrorMessages();

    // Basic validation for username (not empty)
    const usernameError = document.getElementById("username-error");
    if (username === "") {
        isValid = false;
        usernameError.textContent = "Please enter your username.";
    }

    // Basic validation for email (not empty and valid format)
    const emailError = document.getElementById("email-error");
    if (email === "") {
        isValid = false;
        emailError.textContent = "Please enter your email.";
    } else if (!isValidEmail(email)) {
        isValid = false;
        emailError.textContent = "Please enter a valid email address.";
    }

    // Basic validation for phone (not empty and numeric)
    const phoneError = document.getElementById("phone-error");
    if (phone === "") {
        isValid = false;
        phoneError.textContent = "Please enter your phone number.";
    } else if (!isValidPhone(phone)) {
        isValid = false;
        phoneError.textContent = "Please enter a valid phone number.";
    }

    // Basic validation for message (not empty)
    const messageError = document.getElementById("message-error");
    if (message === "") {
        isValid = false;
        messageError.textContent = "Please enter your message.";
    }

    return isValid;
}

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone number format (basic validation for numbers)
function isValidPhone(phone) {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
}

// Function to clear all error messages
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function(errorMessage) {
        errorMessage.textContent = "";
    });
}
