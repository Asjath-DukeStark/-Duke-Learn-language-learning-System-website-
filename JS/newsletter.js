const subscribe = document.getElementById("form");
const fullname = document.getElementById("username");
const email = document.getElementById("email");

function sendEmail() {
    const bodymessage = `Name: ${fullname.value} <br> Email: ${email.value}`;

    Email.send({
        Host: "smtp.elasticemail.com",
        Username: "dk.learn0@gmail.com",
        Password: "F9D983F7AF8DF69E6BBCCE407C9320EE7763",
        To: 'dk.learn0@gmail.com',
        From: "dk.learn0@gmail.com",
        Subject: "New Subscription!",
        Body: bodymessage
    }).then(
        message => {
            if (message === "OK") {
                Swal.fire({
                    title: "SUBSCRIBED!",
                    text: `Dear ${fullname.value}, you have successfully subscribed to our newsletter`,
                    icon: "success"
                }).then(() => {
                    // Reset form fields after success message
                    fullname.value = "";
                    email.value = "";
                });
            }
        }
    );
}

// ... Validating Inputs ...

function validateForm() {
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");

    const nameValue = fullname.value.trim();
    const emailValue = email.value.trim();

    // Validate Name
    if (nameValue === "") {
        nameError.innerText = "Name cannot be blank";
        fullname.classList.add("error");
        fullname.parentElement.classList.add("error");
    } else {
        nameError.innerText = "";
        fullname.classList.remove("error");
        fullname.parentElement.classList.remove("error");
    }

    // Validate Email
    const isValidEmail = /\S+@\S+\.\S+/.test(emailValue);
    if (emailValue === "") {
        emailError.innerText = "Email cannot be blank";
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else if (!isValidEmail) {
        emailError.innerText = "Enter a valid email address";
        email.classList.add("error");
        email.parentElement.classList.add("error");
    } else {
        emailError.innerText = "";
        email.classList.remove("error");
        email.parentElement.classList.remove("error");
    }

    // If no errors, proceed to send email
    if (nameError.innerText === "" && emailError.innerText === "") {
        sendEmail();
    }
}

subscribe.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();


});