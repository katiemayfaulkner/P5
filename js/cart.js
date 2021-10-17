let emptyContent = document.getElementById('emptyContent');
let box = document.getElementById('cartProducts');

function removeContent() {
    emptyContent.style.display = "none"
}

// DYNAMIC CART ITEMS
let cart = document.getElementById('cartProducts')
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
for (let i = 0; i < cartItems.length; i++){

    removeContent()

    product = cartItems[i];

    // Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    box.setAttribute('id', 'cartProduct') 
    cart.appendChild(box); //append box to cart

    // Create container
    let container = document.createElement('div');
    container.classList.add('prodContainer')
    container.setAttribute('id', 'prodContainer')
    box.appendChild(container); //append box to cart

    // IMG
    let img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    container.appendChild(img); //append it to box

    // Title
    let title = document.createElement('h3');
    title.classList.add('title');
    title.innerHTML = `${product.name}`;
    container.appendChild(title); //append it to box

    // Option
    let option = document.createElement('h3');
    option.classList.add('option');
    option.innerHTML = `${product.option}`;
    box.appendChild(option); //append it to box

    // Quantity
    let quantity = document.createElement('input');
    quantity.classList.add('itemQuantity', 'col-1');
    quantity.setAttribute('id', 'itemQuantity')
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', product.quantity);
    quantity.setAttribute('name', 'quantity');
    quantity.setAttribute('data-index', i);
    box.appendChild(quantity); //append it to container

    // Price
    let price = document.createElement('h3');
    price.classList.add('price', 'col-2');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = '$' + `${product.price}`;
    box.appendChild(price); //append it to box

    // Remove
    let btnContainer = document.createElement('div');
    btnContainer.classList.add('removeBtn', 'col-1');
    btnContainer.setAttribute('id', 'removeBtn');
    btnContainer.setAttribute('data-index', i);
    btnContainer.addEventListener('click', function(e) {
        console.log(e);
        console.log(e.target.attributes['data-index'].value); // 0

        let index = e.target.attributes['data-index'].value;
        cartItems.splice(index, 1);
        localStorage.setItem('productsInCart', JSON.stringify(cartItems));
        location.reload();
    })
    
    let remove = document.createElement('img');
    remove.src = "img/bin.png"; 
    btnContainer.appendChild(remove);

    box.appendChild(btnContainer); //append it to box

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

    if(isNaN(value) || value <= 0) {  //Check if value is invalid (number < or = to 1)
        value = 1  // If invalid, change to 1
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
