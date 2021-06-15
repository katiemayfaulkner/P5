const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

console.log(productId)
console.log(urlParams)

var img = document.getElementById('productImg')
var camera = document.getElementById('productName')
var options = document.getElementById('productOptions')
var price = document.getElementById('productPrice')
var description = document.getElementById('productDescription')

/* TODO: Get single product details from the API via product ID */

function getProduct() {
    fetch('http://localhost:3000/api/cameras/' + productId) 
    .then(response => response.json())
    .then(data => { console.log(data);


        img.src = `${data.imageUrl}`;
        btn.textContent = 'See lens options '
        camera.textContent = `${data.name}`;
        price.textContent = `${data.price / 100}.00$`;
        description.textContent = `${data.description}`;
        options.textContent = `${data.lenses}`;
        
        
        // for(let i = 0; i < data.length; i++) { 
            
            //     //Create box
            //     let lenses = document.createElement('div');
            //     lenses.classList.add('lenses')
            
            //     //Lenses
            //     lenses.innerHTML = `${data.lenses}`;
            //     lenses.innerHTML = data.lenses[i];
            
            //     //Append them to something 
            
            //     lenses.appendChild(items)
            
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