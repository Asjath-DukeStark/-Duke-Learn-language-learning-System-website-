// Creates a countdown on a webpage from 5 to 0
let countdown = 5; // Initialize countdown variable with a value of 5
let countdownElement = document.getElementById('countdown'); // Get the HTML element with ID 'countdown'

// Updating the countdown every second
let countdownInterval = setInterval(() => { // Set up a recurring interval
  countdown--; // Decrement countdown variable
  countdownElement.textContent = countdown; // Update the displayed countdown value
}, 1000); // Interval duration is 1000 milliseconds (1 second)

// After 5 seconds redirects the user to the "S.html" page
setTimeout(function() { // Set up a one-time timer
  window.location.href = "../HTML/Home.html"; // Redirect the user to the specified URL
}, 5000); // Timer duration is 5000 milliseconds (5 seconds)