// Get single prod details from the API via prod ID
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let img = document.getElementById('productImg');
let product = document.getElementById('productName');
let price = document.getElementById('productPrice');
let description = document.getElementById('productDescription');
let productOptions = document.getElementById('productOptions');

// Store the product object in outer scope
let productDetails = {};

// Dynamically show selected item
function getProduct() {
fetch('http://localhost:3000/api/cameras/' + productId)
    .then(response => response.json())
    .then(data => {
        productDetails = data;

        img.src = `${data.imageUrl}`;
        product.textContent = `${data.name}`;
        price.textContent = `${data.price / 100}.00$`;
        description.textContent = `${data.description}`;
        
        for (let i = 0; i < data.lenses.length; i++) {
            let option = document.createElement('option');
            option.setAttribute('id', 'option')
            option.value = data.lenses[i];
            option.innerHTML = data.lenses[i];
            productOptions.appendChild(option);
        }
    })
    .catch(err => console.log(err))
};
getProduct();

// Add to cart 
let addBtn = document.getElementById('addToCart')

// Select lens
productOptions.addEventListener('change', (e) => {
    // save value to products array
    let lens = e.target.value

    addBtn.disabled = false
    addBtn.innerHTML = 'Add to cart';
});

// Save product to localstorage (add to cart)
addBtn.onclick = function addToLocalStorage() {
    product = {
        "id": productDetails._id,
        "name": productDetails.name,
        "price": productDetails.price,
        "imageUrl": productDetails.imageUrl,
        "quantity": 1,
        "option": productOptions.value
    };

    if (localStorage.getItem("productsInCart") === null) {           //checking if local storage is 'null' and adding item if 'true'
        localStorage.setItem("productsInCart", JSON.stringify([]));
    };

    let cart = JSON.parse(localStorage.getItem("productsInCart"));   //assigning local storage item to a variable

    if (cart.length == 0) {     //if there are no objects in the cart it will push active camera
        cart.push(product);
        addBtn.innerHTML = 'Added!';
        addBtn.disabled = true
    
        console.log("Item added to cart!");
        console.log(product);

    } else {
        let index = cart.findIndex(o => o.id == product.id + product.option);     //checking if camera with current id is already in local storage
        if (index != -1) {                                 //if so, alert user
            console.log("Item already added to cart!");
            alert("Item already added to cart!");
        } else {                                           //if not, add to cart
            cart.push(product);
            addBtn.innerHTML = 'Added!';
            addBtn.disabled = true
    
            console.log("Item added to cart!");
            console.log(product);
        };
    };

    localStorage.setItem("productsInCart", JSON.stringify(cart)); //saving item back to local storage
};
