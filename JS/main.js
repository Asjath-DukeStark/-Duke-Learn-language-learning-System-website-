document.addEventListener('DOMContentLoaded', function () {
    const cartIcon = document.getElementById('cart-icon');
    const cart = document.querySelector('.cart');
    const closeCartButton = document.getElementById('close-cart');



    // Toggle cart visibility when cart icon is clicked
    cartIcon.addEventListener('click', function () {
        if (cart.style.display === 'block') {
            cart.style.display = 'none';
        } else {
            cart.style.display = 'block';
        }
    });

    // Hide cart when close button is clicked
    closeCartButton.addEventListener('click', function () {
        cart.style.display = 'none';
    });
});

//Close Cart

document.addEventListener('DOMContentLoaded', function () {
    const cart = document.querySelector('.cart');
    const closeCartButton = document.getElementById('close-cart');

    // Hide cart when close button is clicked
    closeCartButton.addEventListener('click', function () {
        cart.style.display = 'none';
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var closeButton = document.getElementById("close-cart");
    closeButton.click();
});


//making add to cart
//Cart making js

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

//making function

function ready() {
    //remove item from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }

    //Quantity Change
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

}

//remove cart item
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
    updateCartIcon();
}


//Quantity change
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    updateCartIcon();
}

//add cart function
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText
    var productImg = shopProducts.getElementsByClassName('product-img')[0].src
    addProductToCart(title, price, productImg);
    updatetotal();
    updateCartIcon();

}

function addProductToCart(title, price, productImg) {
    var cartItems = document.getElementsByClassName('cart-content')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            displayPopup("You have already added this item to cart");
            return;
        }
    }

    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" name="" id="" value="1" class="cart-quantity">
        </div>
        <!--Remove Item-->
        <i class="bx bx-trash-alt cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0]
        .addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0]
        .addEventListener('change', quantityChanged);
    updateCartIcon();

    displayPopup('Item added successfully');
}

// Function to display a popup message
function displayPopup(message) {
    var popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <span class="close-popup">&times;</span>
            <p>${message}</p>
        </div>
    `;
    document.body.appendChild(popup);

    // Close the popup when the close button is clicked
    var closeButton = popup.querySelector('.close-popup');
    closeButton.addEventListener('click', function () {
        popup.remove();
    });

    // Close the popup after 3 seconds
    setTimeout(function () {
        popup.remove();
    }, 900);
}

// Example usage
// addProductToCart('Product Name', '$10.99', 'product.jpg');


// Quantity in cart icon

function updateCartIcon() {
    var cartBoxes = document.getElementsByClassName('cart-box');
    var quantity = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        quantity += parseInt(quantityElement.value);
    }

    var cartIcon = document.querySelector("#cart-icon");
    cartIcon.setAttribute("data-quantity", quantity);
}




// Checkout Form Popup
const checkoutFormPopup = document.getElementById('checkout-form-popup');
const closeFormPopup = document.getElementById('close-form-popup');
const payNowButton = document.getElementById('pay-now');

payNowButton.addEventListener('click', () => {
    checkoutFormPopup.style.display = 'block';
});

closeFormPopup.addEventListener('click', () => {
    checkoutFormPopup.style.display = 'none';
});



//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;

    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace('$', ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }

    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    document.querySelector('.checkout-total-price').textContent = '$' + total;
}







