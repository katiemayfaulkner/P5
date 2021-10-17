// CART ITEMS
let cart = document.getElementById('cartProducts');
let orderResult = JSON.parse(localStorage.getItem("orderResult"));

for (let i = 0; i < orderResult.products.length; i++) {
    product = orderResult.products[i];

    // Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    cart.appendChild(box);

    // Create container
    let container = document.createElement('div');
    container.classList.add('prodContainer')
    container.setAttribute('id', 'prodContainer')
    box.appendChild(container); //append box to cart

    // image
    let img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    container.appendChild(img); //append it to box

    // Title
    let title = document.createElement('h4');
    title.classList.add('title');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = `${product.name}`;
    container.appendChild(title);

    // Option
    let option = document.createElement('h4');
    option.classList.add('option');
    option.innerHTML = `${product.option}`;
    box.appendChild(option); //append it to box

    // Quantity
    let quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-2');
    box.appendChild(quantityContainer);
    
    let quantity = document.createElement('p');
    quantity.classList.add('itemQuantity');
    quantity.innerHTML = 'x ' + `${product.quantity}`;
    quantityContainer.appendChild(quantity);
    
    // Price
    let price = document.createElement('h4');
    price.classList.add('price', 'col-3');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = '$' + `${product.price}`;
    box.appendChild(price);

    // Total
    let totalBox = document.getElementById('total')
    let total = document.getElementById('totalPrice');
    total.classList.add('totalPrice');
    total.innerText = JSON.parse(localStorage.getItem("total"));

};

// USER INFORMATION
let userBox = document.getElementById('userInfo') //.innerHTML = localStorage.getItem("contact");

// first name
let firstName = document.createElement('p');
firstName.classList.add('name')
firstName.innerHTML = orderResult.contact.firstName;
userBox.appendChild(firstName)

// last name
let lastName = document.createElement('p');
lastName.classList.add('name')
lastName.innerHTML = orderResult.contact.lastName;
userBox.appendChild(lastName)

// email
let email = document.createElement('p');
email.classList.add('email')
email.innerHTML = orderResult.contact.email;
userBox.appendChild(email)

// address
let address = document.createElement('p');
address.classList.add('address')
address.innerHTML = orderResult.contact.address;
userBox.appendChild(address)

// city
let city = document.createElement('p');
city.classList.add('city')
city.innerHTML = orderResult.contact.city;
userBox.appendChild(city)

let orderId = document.getElementById('order_id')
orderId.innerHTML = orderResult.orderId

// EMPTY LOCALSTORAGE WHEN USER RETURNS TO SHOP
onclick = function(emptyStorage) {
    localStorage.clear();
}