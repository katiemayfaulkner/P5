// CART CONTENT (WHEN EMPTY)
let emptyContent = document.getElementById('emptyContent');
let box = document.getElementById('cartProducts');

function removeContent() {
    emptyContent.style.display = "none"
}

// DYNAMIC CART ITEMS
let cart = document.getElementById('cartProducts')
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
for (let i = 0; i < cartItems.length; i++){

    product = cartItems[i];

    // Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    box.setAttribute('id', 'cartProduct') 
    cart.appendChild(box); //append box to cart

    // IMG
    let img = document.createElement('img');
    img.classList.add('prodImage')
    img.setAttribute('src', product.imageUrl);
    box.appendChild(img); //append it to box

    // Create container
    let container = document.createElement('div');
    container.classList.add('prodContainer')
    container.setAttribute('id', 'prodContainer')
    box.appendChild(container); //append box to cart

    // Title
    let title = document.createElement('h3');
    title.classList.add('title');
    title.innerHTML = `${product.name}`;
    container.appendChild(title); //append it to box

    // Option
    let option = document.createElement('h3');
    option.classList.add('option', 'sectionItem');
    option.innerHTML = `${product.option}`;
    container.appendChild(option); //append it to box

    // Quantity
    let quantity = document.createElement('input');
    quantity.classList.add('itemQuantity', 'sectionItem');
    quantity.setAttribute('id', 'itemQuantity')
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', product.quantity);
    quantity.setAttribute('name', 'quantity');
    quantity.setAttribute('min', 1);
    quantity.setAttribute('data-index', i);
    container.appendChild(quantity); //append it to container

    // Price
    let price = document.createElement('h3');
    price.classList.add('price');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = '$' + `${product.price}`;
    container.appendChild(price); //append it to box

    // Remove    
    let remove = document.createElement('img');
    remove.src = "img/bin.png"; 
    remove.classList.add('removeBtn');
    remove.setAttribute('id', 'removeBtn');
    remove.setAttribute('data-index', i);
    remove.addEventListener('click', function(e) {

        let index = e.target.attributes['data-index'].value;
        cartItems.splice(index, 1);
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        location.reload();
    })
    container.appendChild(remove); //append it to box

    removeContent()
    updateTotal()
};                           

// QUANTITY
let quantityInput = document.getElementsByClassName('itemQuantity');

for(let i = 0; i < quantityInput.length; i++) {
    let input = quantityInput[i];
    input.addEventListener('change', quantityChanged);
};

function quantityChanged(e) {
    let input = e.target;
    let value = input.value;
    let index = e.target.attributes['data-index'].value;

    if(value <= 0) {  //Check if value is invalid (number < or = to 1)
        value = 1  // If invalid, change to 1
        input.value = 1; // UPDATING THE INPUT VISIBLE VALUE ITSELF.
    };

    cartItems[index].quantity = parseInt(value);

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    updateTotal()    
};

// EMPTY WHOLE CART : EXTRA FEATURE
let emptyBtn = document.getElementById('emptyCart');
let content = document.getElementById('cartProducts');

emptyBtn.onclick = function() {
    localStorage.clear();
    content.remove()
    
    updateTotal()
    location.reload();
}

// UPDATE CART TOTAL
function updateTotal() {
    
    let cartContainer = document.getElementById('cartProducts');
    let cartRows = document.getElementsByClassName('cartProduct');
    let total = 0;
    
    for(let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('price')[0];
        let quantityElement = cartRow.getElementsByClassName('itemQuantity')[0];
        
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
        
    }
    
    total = Math.round(total * 100) / 100;
    document.getElementById('totalPrice').innerText = '$' + total;
};

// FORM VALIDATION / ORDER CONFIRMATION
let btn = document.getElementById('submitButton');
function checkform() {

    // Order button is disabled unless form is filled
    let form = document.getElementsByClassName('formInput');
    let cansubmit = true;

    for (let i = 0; i < form.length; i++) {
        if (form[i] == 0) cansubmit = false;
    }

    if (cansubmit) {
        btn.disabled = false;
    }
    else {
        btn.disabled = true;
    }
}

// Validation
function validateData(data) { 

    // contact details
    let firstName = document.getElementById('firstName').value;
    let lastName = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;

    let contact = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "city": city,
        "email": email
    };

    localStorage.setItem("contact", JSON.stringify(contact));                                                     

    // product details
    let products = [];
    let productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
    
    for(let i = 0; i < productsInCart.length; i++) {
        //extracting ids from localstorage & pushing to "products" array for validation
        let ids = productsInCart.map(a => a.id)[i];
        products.push(ids)
    };

    // total price
    let totalPrice = document.getElementById('totalPrice').innerText;
    let total = localStorage.setItem("total", JSON.stringify(totalPrice));

    // VALIDATION
    fetch("http://localhost:3000/api/cameras/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                    contact: contact,  
                    products: products, //stringifying the object

            })
    }).then(async result_ => {
        const response = await result_.json() //waiting for the result before saving things   

        //contact and product details
        data = {
            contact: contact,  
            products: productsInCart,
            orderId: response.orderId,
        }

        localStorage.setItem("orderResult", JSON.stringify(data)) //stocking the value inside 2 localstorages
        window.location = "Confirmation.html"

    })
    .catch(error => {
        console.error(error);
    })
};

let form = document.getElementById('orderForm');

form.addEventListener("submit", function(e) { 
    e.preventDefault();
    validateData();
});
