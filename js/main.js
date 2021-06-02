const allProducts = document.getElementById('allProducts');

fetch('http://localhost:3000/api/cameras')
    .then(response => response.json())
    .then(data => {
        console.log(data);

        for(let i = 0; i < data.length; i++) {
        // Create a box
    let box = document.createElement('div');
    box.classList.add('item');
    box.classList.add('col-lg-4');
    box.classList.add('col-md-6');
        // Image
    let img = document.createElement('img');
    img.setAttribute('src', data[i].imageUrl)
    img.classList.add('img')

      //Name, price, description
    let name = document.createElement('h2');
    name.innerHTML = data[i].name;

    let price = document.createElement('p');
    price.innerHTML = '$' + data[i].price;

    let description = document.createElement('p');
    description.innerHTML = data[i].description;

    //Lenses
    let lenses = document.createElement('p');
    lenses.innerHTML = 'Lens options : ' + data[i].lenses;

      //Append it
      box.appendChild(img);
      box.appendChild(name);
      box.appendChild(price);
      box.appendChild(description);
      box.appendChild(lenses);

       // Append it to something!
      allProducts.appendChild(box);
    
        }
    })

    .catch(err => console.log(err))



