// OOP - OBJECT ORIENTED PROGRAMMING
// class Human {
//     constructor(name, skinColor) {
//         this.name = name;
//         this.skinColor = skinColor;
//         this.eyes = 2;
//         this.legs = 2;
//     }

//     walk = () => {
//         console.log('I q, zqlking')
//     }

//     talk = (intro) => {
//         console.log(`${intro} My name is ${this.name} and skin color is ${this.skinColor}, and I hqve ${this.eyes} eyes`)
//     }
// }

// let yahya = new Human('Yahyq', 'normal');
// yahya.talk('BOM BOM BOM BOM.  ')

    
// GET SINGLE PROD DETAILS FROM THE API VIA PROD ID 
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log(productId);
console.log(urlParams); 

var img = document.getElementById('productImg');
var product = document.getElementById('productName');
var price = document.getElementById('productPrice');
var description = document.getElementById('productDescription');
let productOptions = document.getElementById('product_options');

/*

JS Scope
- Block Scope (KT in a few miles away from home) - A BLOCK (Function, Loop, Condition.... {} is a block)
- Local Scope (911 number in US) - A variable at the first line of the file
- Global Scope (COVID in the world) - LocalStorage

*/



let productDetails = {};

function getProduct() {
    // THIS IS ASYNC REQUEST... IT'S ALWAYS DELAYED IN JS EXECUTION.
    fetch('http://localhost:3000/api/cameras/' + productId)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            // Store the product object in outer scope!
            productDetails = data;

            img.src = `${data.imageUrl}`;
            product.textContent = `${data.name}`;
            price.textContent = `${data.price / 100}.00$`;
            description.textContent = `${data.description}`;
            
            for (let i = 0; i < data.lenses.length; i++) {
                let option = document.createElement('option');
                option.value = data.lenses[i];
                option.innerHTML = data.lenses[i];
                productOptions.appendChild(option);
            }
        })
        .catch(err => console.log(err))

};
getProduct();

console.log(productDetails)

// SELECT INPUT EVENT (LENSES)
productOptions.addEventListener('change', (e) => {
    // Here's the value, printed in the console, save it wherever you want ;) (localStorage)
    console.log(e.target.value)
});


//SAVE PRODUCT TO LOCALSTORAGE
var addBtn = document.getElementById('addToCart')

addBtn.onclick = function addToLocalStorage() {
    product = {
        "id": productDetails._id,
        "name": productDetails.name,
        "price": productDetails.price,
        "imageUrl": productDetails.imageUrl,
        "quantity": 1,
    };

    console.log(product)

    if (localStorage.getItem("productsInCart") === null) {           //checking if local storage is 'null' and adding item if 'true'
        localStorage.setItem("productsInCart", JSON.stringify([]));
    };

    let cart = JSON.parse(localStorage.getItem("productsInCart"));   //assigning local storage item to a variable

    if (cart.length == 0) {     //if there are no objects in the cart it will push active camera
        cart.push(product);
        addBtn.innerHTML = 'Added!';
        addBtn.style.width = '120px';
    
        console.log("Item added to cart!");
        console.log(product);

    } else {
        let index = cart.findIndex(o => o.id == product.id);     //checking if camera with current id is already in local storage
        if (index != -1) {                                      //if so, alert user
            console.log("Item already added to cart!");
            alert("Item already added to cart!");
        } else {                                                //if not, add to cart
            cart.push(product);
            addBtn.innerHTML = 'Added!';
            addBtn.style.width = '120px';
    
            console.log("Item added to cart!");
            console.log(product);
        };
    };

    localStorage.setItem("productsInCart", JSON.stringify(cart)); //saving item back to local storage
};
