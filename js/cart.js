//DYNAMIC CART ITEMS
var cart = document.getElementById('cartProducts')
let cartItems = JSON.parse(localStorage.getItem("camerasInCart"));

for (let i = 0; i < cartItems.length; i++){
    // let key = localStorage.key(i);
    // let value = localStorage.getItem(key);
    camera = cartItems[i];

    //Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')
    cart.appendChild(box); //append box to cart

    //Title
    var title = document.createElement('h3');
    title.classList.add('title', 'col-3');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = `${camera.name}`;
    box.appendChild(title); //append it to box

    //Quantity
    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-3');
    box.appendChild(quantityContainer); //append it to box

    var quantity = document.createElement('input');
    quantity.classList.add('itemQuantity');
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', '1');
    quantity.setAttribute('name', 'quantity');
    quantityContainer.appendChild(quantity); //append it to container

    //Price
    var price = document.createElement('h3');
    price.classList.add('price', 'col-3');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = `${camera.price}`;
    box.appendChild(price); //append it to box

    //Remove
    let remove = document.createElement('button');
    remove.classList.add('btn-remove');
    remove.setAttribute('id', 'removeBtn');
    remove.innerHTML = 'Remove';
    box.appendChild(remove); //append it to box

    console.log(title, price);

    updateTotal()
};

//ALLOW FUNCTIONALITIES WHEN PAGE LOADS
if (document.readyState == 'loading') {

    document.addEventListener('DOMContentLoaded', ready);

} else {
    ready();
};

function ready() {

    //REMOVE BUTTON
    var removeBtn = document.getElementsByClassName('btn-remove');

    for(var i = 0; i < removeBtn.length; i++) {
        var btn = removeBtn[i];
        btn.addEventListener('click', removeCart);
    };


    //QUANTITY
    var quantityInput = document.getElementsByClassName('itemQuantity');

    for(var i = 0; i < quantityInput.length; i++) {
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    };

};

//REMOVE BUTTON
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

function removeCart(event) {
    var btnClicked =  event.target;
    parent = btnClicked.parentElement.productId;
    cart = JSON.parse(localStorage.getItem("camerasInCart"));

    for (let camera of cart) {
        if (camera.id === parent) {    // strict comparison of id's (parent - element in local storage)
                camIndex = cart.indexOf(camera);
                cart.splice(camIndex, 1);   //removing camera from local storage array

                element = document.getElementById(parent);  //removing element from the document
                element.remove();
        }
    }

    btnClicked.parentElement.remove();
    
    updateTotal();
};

//QUANTITY
function quantityChanged(event){
    var input = event.target;

    if(isNaN(input.value) || input.value <= 0) {  //Check if value is invalid (number < or = to 1)
        input.value = 1  // If invalid, change to 1
    };
    updateTotal();
};

//EMPTY WHOLE CART : EXTRA FEATURE
var emptyBtn = document.getElementById('emptyCart');
var content = document.getElementById('cartProducts');

emptyBtn.onclick = function() {
    localStorage.clear();
    content.remove()
    
    updateTotal()
}

//UPDATE CART TOTAL
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

//BUTTON IS DISABLED UNLESS FORM IS FILLED
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
 



btn.addEventListener("click", function(){  

  //SEND FORM DATA TO LOCALSTORAGE
    var firstName = document.getElementById('firstName').value;
    var lastName = document.getElementById('lastName').value;
    var address = document.getElementById('address').value;
    var city = document.getElementById('city').value;
    var email = document.getElementById('email').value;

    localStorage.setItem('firstName', firstName)
    localStorage.setItem('lastName', lastName)
    localStorage.setItem('address', address)
    localStorage.setItem('city', city)
    localStorage.setItem('email', email)

    console.log(firstName, lastName, address, city, email)

    window.location.href = "Confirmation.html"

    // fetch("http://localhost:3000/api/cameras/order").then(function(response) {
    //     console.log(response.text());
    //     return response;
    
    // });

});





// const cameraIds = ["5be1ed3f1c9d44000030b061", "5be1ef211c9d44000030b062", "5be9bc241c9d440000a730e7", "5be9c4471c9d440000a730e8", "5be9c4c71c9d440000a730e9"];
// let productArray = cameraIds.toString();

// fetch('​http://localhost:3000/api/cameras/order', {
//     method: 'POST',
//     body: {
//         contact: {
//             firstName: string,
//             lastName: string,
//             address: string,
//             city: string,
//             email: string
//         },
//         products: {
//             productArray
//         }
//     }
// });


// location.assign("http://127.0.0.1:5501/Confirmation.html?");