//CART ITEMS
var cart = document.getElementById('cartProducts');
let cartItems = JSON.parse(localStorage.getItem("camerasInCart"));

for (let i = 0; i < cartItems.length; i++){
    camera = cartItems[i];

    //Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    cart.appendChild(box);

    //Title
    var title = document.createElement('h4');
    title.classList.add('title', 'col-4');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = `${camera.name}`;
    box.appendChild(title);

    //Quantity
    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-4');
    box.appendChild(quantityContainer);

    var quantity = document.createElement('input');
    quantity.classList.add('itemQuantity');
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', '1');
    quantity.setAttribute('name', 'quantity');
    quantityContainer.appendChild(quantity);

    //Price
    var price = document.createElement('h4');
    price.classList.add('price', 'col-4');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = `${camera.price}`;
    box.appendChild(price);

    //Total
    var totalBox = document.getElementById('total')
    var total = document.getElementById('totalPrice');
    total.classList.add('totalPrice');
    total.innerText = JSON.parse(localStorage.getItem("total"));

    console.log(title, price);
};

//USER INFORMATION
var user = document.getElementById('userInfo');
let userInfo = JSON.parse(localStorage.getItem("user"));
console.log(userInfo)

for (let i = 0; i < userInfo.length; i++) {
    

    //create box
    let box = document.createElement('div');
    box.classList.add('container')
    user.appendChild(box);

    //create sections for each user detail
    //first name
    let firstName = document.createElement('span');
    firstName.classList.add('firstName')
    firstName.innerHTML = firstName;
    box.appendChild(firstName)


    //last name
    let lastName = document.createElement('span');
    lastName.classList.add('lastName')

    box.appendChild(lastName)

    //address
    let address = document.createElement('span');
    address.classList.add('address')

    box.appendChild(address)

    //city
    let city = document.createElement('span');
    city.classList.add('city')

    box.appendChild(city)

    //email
    let email = document.createElement('span');
    email.classList.add('email')

    box.appendChild(email)
}