


document.addEventListener('DOMContentLoaded', function () {
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', function () {
        console.log('Button clicked');

        // Validate form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const address = document.getElementById('address').value.trim();
        const cardNumber = document.getElementById('card-number').value.trim();
        const expiry = document.getElementById('expiry').value.trim();

        if (name === '' || email === '' || address === '') {
            displayPopup('Please fill out all required fields.');
            return;
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            displayPopup('Invalid email format.');
            return;
        }

        if (!/^\d{3}\d{3}\d{4}$/.test(phone)) {
            displayPopup('Invalid phone number format. Use 10 digit.');
            return;
        }

        if (!/^\d{16}$/.test(cardNumber)) {
            displayPopup('Invalid card number format. Must be 16 digits.');
            return;
        }

        if (!/^\d{2}\/\d{2}$/.test(expiry)) {
            displayPopup('Invalid expiry date format. Use MM/YY format.');
            return;
        }

        // Proceed with order processing
        //Construct order summary
        const cartContent = document.querySelector('.cart-content');
        const cartItems = cartContent.querySelectorAll('.cart-box');
        // Check if cart is empty
        if (cartItems.length === 0) {
            displayPopup('Your cart is empty. Please add some items before placing an order.');
            return;
        }
        let summary = `Dear ${name}, you have ordered:\n`;
        let totalBill = 0;
        cartItems.forEach(item => {
            const productName = item.querySelector('.cart-product-title').textContent;
            const productPrice = parseFloat(item.querySelector('.cart-price').innerText.replace('$', ''));
            const productQuantity = parseInt(item.querySelector('.cart-quantity').value);
            const total = productPrice * productQuantity;
            totalBill += total;
            summary += `${productQuantity} ${productName} at a cost of $${productPrice.toFixed(2)} each\n`;
        });
        summary += `Your total bill is $${totalBill.toFixed(2)}.`;

        // Display order summary in popup
        displayModal(summary);
    });
});

function displayModal(message) {
    var popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);

    // Close the modal when the close button is clicked
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function() {
    modal.style.display = 'none';
    resetCartAndForm(); // Reset the cart and form
    window.location.href = '../HTML/product.html'; // Redirect to the product page
});


}


// Function to display a message in a modal
function displayModal(message) {
    const modal = document.getElementById('myModal');
    const modalMessage = document.getElementById('modal-message');
    modalMessage.textContent = message;
    modal.style.display = 'block';

    // Close the modal and refresh the page when the close button is clicked
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function() {
        modal.style.display = 'none';
        location.reload(); // Refresh the page
    })

}

    

