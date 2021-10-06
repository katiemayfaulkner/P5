var emptyContent = document.getElementById('emptyContent');
var box = document.getElementById('cartProducts');

function removeContent() {
    emptyContent.style.display = "none"
}

// DYNAMIC CART ITEMS
var cart = document.getElementById('cartProducts')
let cartItems = JSON.parse(localStorage.getItem("productsInCart"));
for (let i = 0; i < cartItems.length; i++){

    removeContent()

    // let key = localStorage.key(i);
    // let value = localStorage.getItem(key);
    product = cartItems[i];

    // Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    box.setAttribute('data-product', i); 
    cart.appendChild(box); //append box to cart

    // IMG
    var img = document.createElement('img');
    img.setAttribute('src', product.imageUrl);
    box.appendChild(img); //append it to box

    // Title
    var title = document.createElement('h3');
    title.classList.add('title', 'col-3');
    title.innerHTML = `${product.name}`;
    box.appendChild(title); //append it to box

    // Quantity
    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-3');
    box.appendChild(quantityContainer); //append it to box

    var quantity = document.createElement('input');
    quantity.classList.add('itemQuantity');
    quantity.setAttribute('id', 'itemQuantity')
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', product.quantity);
    quantity.setAttribute('name', 'quantity');
    quantity.setAttribute('data-index', i);                                       // !!!!!!!!!
    quantityContainer.appendChild(quantity); //append it to container

    // Price
    var price = document.createElement('h3');
    price.classList.add('price', 'col-2');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = '$' + `${product.price}`;
    box.appendChild(price); //append it to box

    // Remove
    let remove = document.createElement('button');
    remove.classList.add('btn-remove');
    remove.setAttribute('id', 'removeBtn');
    remove.innerHTML = 'Remove';
    box.appendChild(remove); //append it to box

    console.log(title, price);

    updateTotal()
};

// ALLOW FUNCTIONALITIES WHEN PAGE LOADS
if (document.readyState == 'loading') {

    document.addEventListener('DOMContentLoaded', ready);

} else {
    ready();
};

function ready() {

    // REMOVE BUTTON
    var removeBtn = document.getElementsByClassName('btn-remove');

    for(var i = 0; i < removeBtn.length; i++) {
        var btn = removeBtn[i];
        btn.addEventListener('click', removeCart);
    };


    // QUANTITY
    var quantityInput = document.getElementsByClassName('itemQuantity');

    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    };

};

// REMOVE BUTTON

// var removeBtn = document.getElementsByClassName('btn-remove');
// removeBtn.onclick = removeCart;
    
// for(var i = 0; i < cart.length; i++){

//     var itemId = cart.find(element => element = 'id')
//     console.log(itemId)
// }


// function removeCart() {
    
//     parent = removeBtn.parentElement.itemId;
//     cart = JSON.parse(localStorage.getItem("camerasInCart"));

//     for (let camera of cart) {
//         if (camera.id === parent) {    // strict comparison of id's (parent - element in local storage)
//                 camIndex = cart.indexOf(camera);
//                 cart.splice(camIndex, 1);   //removing camera from local storage array

//                 // element = document.getElementById(parent);  //removing element from the document
//                 parent.remove();
//         }
//     }

//     // btnClicked.parentElement.remove();   
//     updateTotal();
// };

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function removeCart(event) {
    var btnClicked =  event.target;
    parent = btnClicked.parentElement.productId;
    cart = JSON.parse(localStorage.getItem("camerasInCart"));

    for (let product of cart) {
        if (product.id === parent) {    // strict comparison of id's (parent - element in local storage)
                camIndex = cart.indexOf(product);
                cart.splice(prodIndex, 1);   //removing camera from local storage array

                element = document.getElementById(parent);  //removing element from the document
                element.remove();
        }
    }

    btnClicked.parentElement.remove();
    
    updateTotal();
};

// QUANTITY
function quantityChanged(event){
    var input = event.target;

    input.value

    if(isNaN(input.value) || input.value <= 0) {  //Check if value is invalid (number < or = to 1)
        input.value = 1  // If invalid, change to 1
    };

    updateTotal();
};

// EMPTY WHOLE CART : EXTRA FEATURE
var emptyBtn = document.getElementById('emptyCart');
var content = document.getElementById('cartProducts');

emptyBtn.onclick = function() {
    localStorage.clear();
    content.remove()
    
    updateTotal()
    location.reload();
}

// UPDATE CART TOTAL
function updateTotal() {
    
    var cartContainer = document.getElementById('cartProducts');
    var cartRows = document.getElementsByClassName('cartProduct');
    var total = 0;
    
    for(var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('price')[0];
        var quantityElement = cartRow.getElementsByClassName('itemQuantity')[0];
        
        var price = parseFloat(priceElement.innerText.replace('$', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
        
    }
    
    total = Math.round(total * 100) / 100;
    document.getElementById('totalPrice').innerText = '$' + total;
};


//** FORM VALIDATION / ORDER CONFIRMATION **//

// Order button is disabled unless form is filled
var btn = document.getElementById('submitButton');

function checkform() {
    var form = document.getElementsByClassName('formInput');
    var cansubmit = true;

    for (var i = 0; i < form.length; i++) {
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

    //SEND REQUIRED INFO TO LOCALSTORAGE
    //get contact details
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var email = document.getElementById('email').value;

    // var contact = [firstName, lastName, address, city, email];
    let contact = {
        "firstName": firstName,
        "lastName": lastName,
        "address": address,
        "city": city,
        "email": email
    };

    localStorage.setItem("contact", JSON.stringify(contact));

    // // get extra details (quantity)
    // var itemQuantity = document.getElementsByClassName('itemQuantity').value
    // console.log(itemQuantity)
    // for(var i = 0; i < itemQuantity.length; i++) {
    
    //     console.log(itemQuantity)
    // }

    // // get extra details (quantity)
    // var input = document.getElementById('itemQuantity');
    // var itemQuantity = document.getElementById('itemQuantity').value;

    // input.onclick = function(){
    //     for (let i = 0; i < itemQuantity.length; i++){ 
    //         console.log(itemQuantity);
    //     }
    // };

    //get product details
    var products = [];
    var productsInCart = JSON.parse(localStorage.getItem("productsInCart"));

    for(let i = 0; i < productsInCart.length; i++) {
        //extract ids from localstorage and push to "products" array
        let ids = productsInCart.map(a => a.id)[i];
        products.push(ids)
    };

    console.log(products);

    //get total price
    var totalPrice = document.getElementById('totalPrice').innerText;
    console.log(totalPrice);
    var total = localStorage.setItem("total", JSON.stringify(totalPrice));

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
            id: response.orderId,
        }

        console.log(data)

        // localStorage.setItem("orderResult", JSON.stringify(result.orderId)) //stocking the value inside 2 localstorages
        window.location = "Confirmation.html"

    })
    .catch(error => {
        console.error(error);
    })
};

btn.addEventListener("click", function(){  
    validateData();
});

