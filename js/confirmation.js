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

};

//USER INFORMATION
var userBox = document.getElementById('userInfo') //.innerHTML = localStorage.getItem("contact");
var userInfo = JSON.parse(localStorage.getItem("contact"));

//first name
let firstName = document.createElement('p');
firstName.classList.add('name')
firstName.innerHTML = userInfo.firstName;
userBox.appendChild(firstName)

//last name
let lastName = document.createElement('p');
lastName.classList.add('name')
lastName.innerHTML = userInfo.lastName;
userBox.appendChild(lastName)

//email
let email = document.createElement('p');
email.classList.add('email')
email.innerHTML = userInfo.email;
userBox.appendChild(email)

//address
let address = document.createElement('p');
address.classList.add('address')
address.innerHTML = userInfo.address;
userBox.appendChild(address)

//city
let city = document.createElement('p');
city.classList.add('city')
city.innerHTML = userInfo.city;
userBox.appendChild(city)


//EMPTY LOCALSTORAGE WHEN USER RETURNS TO SHOP
onclick = function(poop) {
    localStorage.clear();
}

var idBox = document.getElementById('orderID')
function getProduct(data) {
    fetch('http://localhost:3000/api/cameras/order')
        .then(response => response.json())
        .then(data => {
            console.log(data);

            idBox.textContent = `${data.orderID}`;
            
        })
        .catch(err => console.log(err))


        // .then(async result_ => { //GET the stringify arr
        //     const response = await result_.json() //give a ame to that arr
        //     console.log(data);

        //     idBox.textContent = `${data.orderID}`;
            
        // })
        // .catch((error) => {
        //     console.log(error);
        // })
};
// getProduct();
