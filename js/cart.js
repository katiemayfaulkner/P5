// ** QUANTITY BUTTONS
var inputBox = document.getElementById('itemQuantity')
var inputBtn = document.getElementById('Button')
console.log(itemQuantity)
console.log(Button)

// append the buttons to the input
$(function() {

    $("inputBox").append('inputBtn');
    
});

// make buttons work
$(".button").on("click", function() {
    
    // Cache the selector
    var $button = $(this);
    // Save the “old” value of the input (value at time of clicking)
    var oldValue = $button.parent().find("input").val();
    
    // If the “plus” button is clicked…
    if ($button.text() == "+") {
        // …increment value up one
        var newVal = parseFloat(oldValue) + 1;
        
	} else { // Else if the “minus” button is clicked…

        var newVal = parseFloat(oldValue) - 1;
        // Don't allow decrementing below zero
        if (oldValue > 0) {
            // …decrement the value down one
            var newVal = parseFloat(oldValue) - 1;
        } else {
            newVal = 0;
        }
    }
    
  // Drop the new value into the input
  $button.parent().find("input").val(newVal);

});


//** CART CONTENT
var cart = document.getElementById('cartProducts')
var imgContainer = document.getElementById('productImg')

fetch('http://localhost:3000/api/cameras')
.then(response => response.json())
.then(data => {
    console.log(data);
    
    for(let i = 0; i < data.length; i++) {
        
        // Image
        // let img = document.createElement('img');
        //   img.setAttribute('src', data[i].imageUrl)
        //   img.classList.add('img')
        //   imgContainer.appendChild(img)

        var img = document.getElementById('productImg')
        img.setAttribute('src', data[i].imageUrl)
        
        //Price
        // let price = document.createElement('p');
        //   price.innerHTML = `${data[i].price / 100}.00$`;
        //   price.classList.add('price')
        //   cart.appendChild(price)

        var price = document.getElementById('productPrice')
        price.innerHTML = `${data[i].price / 100}.00$`;

        }
    })
    .catch(err => console.log(err))


//** REMOVE BTN
var removeBtn = document.getElementsByClassName('btn-remove')

console.log(removeBtn)

for(var i = 0; i < removeBtn.length; i++) {
     var btn = removeBtn[i]
     btn.addEventListener('click', function(event) {
         console.log('clicked')

         var btnClicked =  event.target
         btnClicked.parentElement.remove()
     })
}