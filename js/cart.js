if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready()
}

function ready() {

    // REMOVE BUTTON
    var removeBtn = document.getElementsByClassName('btn-remove') 
    
    for(var i = 0; i < removeBtn.length; i++) {
        var btn = removeBtn[i]
        btn.addEventListener('click', removeCart)
            console.log('clicked')       
    }


    // QUANTITY BUTTONS
    var quantityInputs = document.getElementsByClassName('itemQuantity')
    
    for (var i = 0; i > quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
 
}

// REMOVE BUTTON
    function removeCart(event) {
        var btnClicked =  event.target
        btnClicked.parentElement.remove()
        updateTotal()

    }

// QUANTITY BUTTONS
    function quantityChanged(event) {
        var input = event.target  
        if (isNaN(input.value) || input.value <= 0) {
            input.value = 1

        }
        updateTotal()
    }

    var quantityBtn = document.getElementById('Button')

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

        updateTotal()

        });

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