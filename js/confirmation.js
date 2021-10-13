// CART ITEMS
var cart = document.getElementById('cartProducts');
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));

for (let i = 0; i < cartItems.length; i++){
    product = cartItems[i];

    // Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    cart.appendChild(box);

    // image
    var img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    box.appendChild(img); //append it to box

    // Title
    var title = document.createElement('h4');
    title.classList.add('title', 'col-3');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = `${product.name}`;
    box.appendChild(title);

    // Option
    var option = document.createElement('h4');
    option.classList.add('option', 'col-2');
    option.innerHTML = `${product.option}`;
    box.appendChild(option); //append it to box

    // Quantity
    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-2');
    box.appendChild(quantityContainer);
    
    var quantity = document.createElement('p');
    quantity.classList.add('itemQuantity');
    quantity.innerHTML = 'x ' + `${product.quantity}`;
    quantityContainer.appendChild(quantity);
    
    // Price
    var price = document.createElement('h4');
    price.classList.add('price', 'col-4');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = '$' + `${product.price}`;
    box.appendChild(price);

    // Total
    var totalBox = document.getElementById('total')
    var total = document.getElementById('totalPrice');
    total.classList.add('totalPrice');
    total.innerText = JSON.parse(localStorage.getItem("total"));

};

// USER INFORMATION
var userBox = document.getElementById('userInfo') //.innerHTML = localStorage.getItem("contact");
var userInfo = JSON.parse(localStorage.getItem("contact"));

// first name
let firstName = document.createElement('p');
firstName.classList.add('name')
firstName.innerHTML = userInfo.firstName;
userBox.appendChild(firstName)

// last name
let lastName = document.createElement('p');
lastName.classList.add('name')
lastName.innerHTML = userInfo.lastName;
userBox.appendChild(lastName)

// email
let email = document.createElement('p');
email.classList.add('email')
email.innerHTML = userInfo.email;
userBox.appendChild(email)

// address
let address = document.createElement('p');
address.classList.add('address')
address.innerHTML = userInfo.address;
userBox.appendChild(address)

// city
let city = document.createElement('p');
city.classList.add('city')
city.innerHTML = userInfo.city;
userBox.appendChild(city)


// EMPTY LOCALSTORAGE WHEN USER RETURNS TO SHOP
onclick = function(emptyStorage) {
    localStorage.clear();
}

// Data retrieval
let orderDetails = {};

var idBox = document.getElementById('orderID')

function getProduct() {
    fetch('http://localhost:3000/api/cameras/order')
        .then(response => response.json())
        .then(data => {
            orderDetails = data

            idBox.textContent = `${data.orderId}`;  
            console.log(data);
        })
        .catch((error) => console.log(error));     
};
getProduct();