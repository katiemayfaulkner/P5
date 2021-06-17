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


const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log(productId)
console.log(urlParams)

var img = document.getElementById('productImg')
var camera = document.getElementById('productName')
var price = document.getElementById('productPrice')
var description = document.getElementById('productDescription')
var options = document.getElementById('productOptions')

/* TODO: Get single product details from the API via product ID */

function getProduct() {
    fetch('http://localhost:3000/api/cameras/' + productId) 
    .then(response => response.json())
    .then(data => { 
        console.log(data);

        img.src = `${data.imageUrl}`;
        btn.textContent = 'See lens options '
        camera.textContent = `${data.name}`;
        price.textContent = `${data.price / 100}.00$`;
        description.textContent = `${data.description}`;
        options.textContent = `${data.lenses}`;

        // var productOptions = document.getElementById('productOptions')
        
        // for(let i = 0; i < data.length; i++) { 
            
        //         //Create box
        //         let singleLens = document.createElement('div');
        //         singleLens.classList.add('singleLens')
        //         box.setAttribute("id", "options");
            
        //         //Lenses
        //         singleLens.innerHTML = `${data.lenses}`;
        //         singleLens.innerHTML = data.lenses[i];
            
        //         //Append them to something 
        //         singleLens.appendChild(productOptions)
        // }

        })
        .catch(err => console.log(err))
    }
    getProduct();
    

// Dropdown appears/disappears on click
    var btn = document.getElementById("dropdown")
    var items = document.getElementById("productOptions")
    
    btn.addEventListener('click', function toggleFunction() {
        items.classList.toggle('show')
    })

// LOCALSTORAGE TEST
//storing text input
    //get element
    var inputBox = document.getElementById('textInput')
    
    //If we already have value, retrieve it
    if(localStorage.getItem('userInput')){
        // and update input with old/existing user input
        var oldInput = localStorage.getItem('userInput');
        inputBox.value = oldInput;
        console.log("retrieve existing local storage key")

    } else{
        // or store user input in local storqge
        localStorage.setItem('userInput', '');
        console.log("register new local storage key")

    }
    
    //console log
    console.log(inputBox)

    // inputBox.addEventListener("keyup", function() {
    // localStorage.setItem('userInput', inputBox.value)
    // console.log(inputBox.value)

    // })