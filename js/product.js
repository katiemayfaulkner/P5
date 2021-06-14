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
        options.textContent = 'Lens options : ' + `${data.lenses}`;
        camera.textContent = `${data.name}`;
        price.textContent = `${data.price / 100}.00$`;
        description.textContent = `${data.description}`;
        
    })
    .catch(err => console.log(err))
}
getProduct();




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