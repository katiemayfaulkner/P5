//DYNAMIC CART ITEMS
var cart = document.getElementById('cartProducts')
console.log(cart)

for (let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

    //Create box
    let box = document.createElement('div');
    box.classList.add('cartProduct')

    cart.appendChild(box);

    //Title
    var title = document.createElement('h3');
    title.classList.add('title', 'col-4');
    title.setAttribute('id', 'productTitle');
    title.innerHTML = key;

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
    var price = document.createElement('h3');
    price.classList.add('price', 'col-4');
    price.setAttribute('id', 'productPrice');
    price.innerHTML = value;

    box.appendChild(price);


    console.log(key, value);

}