// Function to validate the review form
function validateReviewForm() {
    var name = document.forms["reviewForm"]["name"].value;
    var comment = document.forms["reviewForm"]["comment"].value;
    var isValid = true;

    // Reset any previous error messages
    document.getElementById("nameError").innerText = "";
    document.getElementById("commentError").innerText = "";

    // Check if name field is empty
    if (name === "") {
        document.getElementById("nameError").innerText = "Please enter your name";
        isValid = false;
    }

    // Check if comment field is empty
    if (comment === "") {
        document.getElementById("commentError").innerText = "Please enter your comment";
        isValid = false;
    }

    return isValid;
}

// Submit review form
reviewForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Validate the form
    if (validateReviewForm()) {
        var name = this.elements["name"].value;
        var comment = this.elements["comment"].value;
        var rating = document.querySelector(".fa-star.checked").dataset.rating;

        console.log("Name: ", name);
        console.log("Comment: ", comment);
        console.log("Rating: ", rating);

        // Show success message
        successMessage.style.display = "block";

        // Reset form fields
        this.reset();

        // Reset rating
        resetRating();

        // Remove the success message after 3 seconds
        setTimeout(function () {
            successMessage.style.display = "none";
        }, 2000);
    }
});

// Function to remove "checked" class from all star icons
function resetRating() {
    var stars = document.querySelectorAll(".fa-star");
    stars.forEach(function (star) {
        star.classList.remove("checked");
    });
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addReviewBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// Rating stars functionality
var stars = document.querySelectorAll(".Add_rating .fa-star");

stars.forEach(function (star) {
    star.addEventListener("click", function () {
        var rating = parseInt(star.dataset.rating);
        for (var i = 0; i < stars.length; i++) {
            if (i < rating) {
                stars[i].classList.add("checked");
            } else {
                stars[i].classList.remove("checked");
            }
        }
    });
});

// Function to change the background, text color, and other related colors
function changeColorScheme(color) {
    const root = document.documentElement;
    switch (color) {
        case 'default':
            root.style.setProperty('--primary-color', '#ff226f');
            root.style.setProperty('--bg-color', '#1eb2a6');
            root.style.setProperty('--primary-color-dark', '#fe6769');
            root.style.setProperty('--white', '#ffffff');
            root.style.setProperty('--second-bg-color', '#999999');
            root.style.setProperty('--text-color', '#0B8278');
            root.style.setProperty('--text-dark', '#333333');
            break;

        case 'blue':
            root.style.setProperty('--primary-color', '#000080'); // Navy Blue
            root.style.setProperty('--bg-color', '#191970'); // Midnight Blue
            root.style.setProperty('--primary-color-dark', '#87CEEB'); // Light Blue
            root.style.setProperty('--white', '#FFFFFF'); // White
            root.style.setProperty('--text-color', '#000080'); // Navy Blue
            root.style.setProperty('--text-dark', '#555555'); // Gray
            break;

        case 'purple':
            root.style.setProperty('--primary-color', '#800080'); // Purple
            root.style.setProperty('--bg-color', '#8B008B'); // Violet
            root.style.setProperty('--primary-color-dark', '#BA55D3'); // light purple
            root.style.setProperty('--white', '#FFFFFF'); // White
            root.style.setProperty('--text-color', '#800080'); // Purple
            root.style.setProperty('--text-dark', '#555555'); // Gray
            break;

        case 'orange':
            root.style.setProperty('--primary-color', '#FF6347'); // Orange
            root.style.setProperty('--bg-color', '#FF8C00'); // Tomato
            root.style.setProperty('--primary-color-dark', '#FFD700'); // Gold
            root.style.setProperty('--white', '#FFFFFF'); // White
            root.style.setProperty('--text-color', '#FF6347'); // Orange
            root.style.setProperty('--text-dark', '#555555'); // Gray
            break;

        default:
            break;
    }
}

function changeBackgroundImage(imageUrl) {
    const root = document.documentElement;
    root.style.setProperty('--bg-image', `url(${imageUrl})`);
}

// Fetch comments from XML file
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "listing.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('comment').each(function () {
                var name = $(this).find('name').text();
                var text = $(this).find('text').text();
                var rating = parseInt($(this).find('rating').text());
                var imgSrc = `./img/${name}.png`;

                var commentHTML = `
                  <div class="card">
                      <img src="${imgSrc}" alt="${name}" />
                      <div class="card__content">
                          <span><i class="ri-double-quotes-l"></i></span>
                          <div class="card__details">
                              <p>${text}</p>
                              <div class="rating">
                                  ${generateStars(rating)}
                              </div>
                              <h4>- ${name}</h4>
                          </div>
                      </div>
                  </div>`;
                $('#commentsContainer').append(commentHTML);
            });
        },
        error: function (xhr, status, error) {
            console.error(xhr);
        }
    });
});

// Function to generate star icons based on rating
function generateStars(rating) {
    var starsHTML = '';
    for (var i = 0; i < 5; i++) {
        if (i < rating) {
            starsHTML += '<span class="fa fa-star checked"></span>';
        } else {
            starsHTML += '<span class="fa fa-star"></span>';
        }
    }
    return starsHTML;
}
