var cart = document.getElementById('cartProducts')

for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        var image = JSON.parse(localStorage.getItem("img"))

    //Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')

    cart.appendChild(box);

    //Image
    var img = document.createElement('img');
    img.classList.add('img');
    img.setAttribute('id', 'image');
    img.src = img;
    box.appendChild(img);

    //Title
    var title = document.createElement('h3');
    title.classList.add('title', 'col-3');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = key;

    box.appendChild(title);

    //Quantity
    var quantityContainer = document.createElement('div');
    quantityContainer.classList.add('quantity', 'col-3');

    box.appendChild(quantityContainer);

    var quantity = document.createElement('input');
    quantity.classList.add('itemQuantity');
    quantity.setAttribute('type', 'number');
    quantity.setAttribute('value', '1');
    quantity.setAttribute('name', 'quantity');

    quantityContainer.appendChild(quantity);

    //Price
    var price = document.createElement('h3');
    price.classList.add('price', 'col-3');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = value;

    box.appendChild(price);

    //Remove
    let remove = document.createElement('button');
    remove.classList.add('btn-remove');
    remove.setAttribute('id', 'removeBtn');
    remove.innerHTML = 'Remove';

    //Append everything
    box.appendChild(remove);

    console.log(key, value);

    updateTotal()
}


//localStorage.removeItem(key); --> TO CLEAR ONE THING IN LOCALSTORAGE
//localStorage.clear(); --> TO CLEAR EVERYTHING IN LOCALSTORAGE


// // TEMPORARY CART CONTENT
// var cart = document.getElementById('cartProducts')
// var imgContainer = document.getElementById('productImg')

// fetch('http://localhost:3000/api/cameras')
// .then(response => response.json())
// .then(data => {
//     console.log(data);
    
//     for(let i = 0; i < data.length; i++) {
        
//         // Image
//         // let img = document.createElement('img');
//         //   img.setAttribute('src', data[i].imageUrl)
//         //   img.classList.add('img')
//         //   imgContainer.appendChild(img)

//         var img = document.getElementById('productImg')
//         img.setAttribute('src', data[i].imageUrl)
        
//         //Price
//         // let price = document.createElement('p');
//         //   price.innerHTML = `${data[i].price / 100}.00$`;
//         //   price.classList.add('price')
//         //   cart.appendChild(price)

//         var price = document.getElementById('productPrice')
//         price.innerHTML = `${data[i].price / 100}.00$`;

//         }
//     })
//     .catch(err => console.log(err))


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

function removeCart(event) {
    var btnClicked =  event.target
    btnClicked.parentElement.remove()

    var key = JSON.parse(localStorage.getItem(key))
    // var key = $(this).attr('key');
    window.localStorage.removeItem('key')
    
    updateTotal()
}

//QUANTITY
function quantityChanged(event){
    var input = event.target

    if(isNaN(input.value) || input.value <= 0) {  //Check if value is invalid (number < or = to 1)
        input.value = 1  // If invalid, change to 1
    }
    updateTotal()
}

//UPDATE CART TOTAL
function updateTotal() {
    
    var cartContainer = document.getElementById('cartProducts')
    var cartRows = cartContainer.getElementsByClassName('cartProduct')
    var total = 0
    
    for(var i = 0; i < cartRows.length; i++) { 
        var cartRow = cartRows[i] 
        var priceElement = cartRow.getElementsByClassName('price')[0]
        var quantityElement = cartRow.getElementsByClassName('itemQuantity')[0]
        
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        
    }
    
    total = Math.round(total * 100) / 100
    document.getElementById('totalPrice').innerText = '$' + total
}

