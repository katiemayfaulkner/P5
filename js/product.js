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
var camera = document.getElementById('productName');
var price = document.getElementById('productPrice');
var description = document.getElementById('productDescription');
let productOptions = document.getElementById('product_options');

function getProduct() {
    fetch('http://localhost:3000/api/cameras/' + productId)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            img.src = `${data.imageUrl}`;
            camera.textContent = `${data.name}`;
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


// SELECT INPUT EVENT (LENSES)
productOptions.addEventListener('change', (e) => {
    // Here's the value, printed in the console, save it wherever you want ;) (localStorage)
    console.log(e.target.value)
});
    

//SAVE PRODUCT TO LOCALSTORAGE
var addBtn = document.getElementById('addToCart')

addBtn.onclick = function addToLocalStorage() {
   
    //things to store
    var name = document.getElementById('productName').textContent
    var price = document.getElementById('productPrice').textContent
    var img = document.getElementById('productImg').src

    console.log(name, price, img)

    var oldInput = localStorage.getItem(name, price, img);

    //If we already have value, retrieve it
    if(localStorage.getItem(name, price, img)){
        // and update input with old/existing user input
        addBtn.value = oldInput;
        console.log("Item already added to cart!")
        alert("Item already added to cart!")
        
    } else{
        // or store user input in local storqge
        localStorage.setItem(name, price, img);
        console.log("Item added to cart!")
    }
    
     
    // // LOCALSTORAGE TEST
    // //storing text input
    // //get element
    // var inputBox = document.getElementById('textInput') //input box
    // var oldInput = localStorage.getItem('userInput');
    
    // //If we already have value, retrieve it
    // if(localStorage.getItem('userInput')){
    //     // and update input with old/existing user input
    //     inputBox.value = oldInput;
    //     console.log("retrieve existing local storage key")
        
    // } else{
    //     // or store user input in local storqge
    //     localStorage.setItem('userInput', '');
    //     console.log("register new local storage key")
    // }
    
    // //console log
    // console.log(inputBox)
    
    // inputBox.addEventListener("keyup", function() {
        // localStorage.setItem('userInput', inputBox.value)
        // console.log(inputBox.value)
        
        // })



    // // Get previous storage, if any
    // var storage = JSON.parse(localStorage.getItem("cart"));
    // if(storage==null){
    //     storage = [];
    // }
    
    // // Create an object to store
    // var data = getProduct();
    
    // var storage = JSON.parse(localStorage.getItem("cart"));
    // var storage = 
    // storage.push(data);
    
    // // Store it
    // localStorage.setItem("cart",JSON.stringify(storage));
};

