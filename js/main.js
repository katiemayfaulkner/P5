const allProducts = document.getElementById('allProducts');

// Iterate over the data, create product cards, and append them to the dom
fetch('http://localhost:3000/api/cameras')
  // Turn json into js array of objects
  .then(response => response.json())
  .then(data => {

    for(let i = 0; i < data.length; i++) {
      // Create a box
      let box = document.createElement('div');
      box.classList.add('item');
      box.classList.add('col-lg-4');
      box.classList.add('col-md-6');
      box.setAttribute("id", "products");

      //Create box for spacing
      let content = document.createElement('div')
      content.classList.add('content')

      // Image
      let img = document.createElement('img');
      img.setAttribute('src', data[i].imageUrl)
      img.classList.add('img')

      //Single page link for img
      let linkWrapper = document.createElement('a');
      linkWrapper.href = `product.html?id=${data[i]._id}`
      linkWrapper.appendChild(img)
    
      //Name
      let name = document.createElement('h2');
      name.innerHTML = data[i].name;
      linkWrapper.appendChild(name) //Single page link for name

      // Price
      let price = document.createElement('p');
      price.innerHTML = `${data[i].price / 100}.00$`;
      price.classList.add('price')

      // Description 
      let description = document.createElement('p');
      description.innerHTML = data[i].description;
      description.classList.add('description')

      //Append them
      content.appendChild(linkWrapper);
      content.appendChild(price);
      content.appendChild(description);
      box.appendChild(content)

      // Append it to something!
      allProducts.appendChild(box);

      // Create anchor element.
      let a = document.createElement('a');
      a.style.fontWeight = "500" 
        
      // Set the href property.
      a.href = `product.html?id=${data[i]._id}`; 

      // Create the text node for anchor element.
      let link = document.createTextNode("See lens options");
        
      // Append the text node to anchor element.
      a.appendChild(link); 
        
      // Set the title.
      a.title = "This is Link"; 
        
      // Append the anchor element .
      content.append(a);
    }
  })
  .catch(err => console.log(err));