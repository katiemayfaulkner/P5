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
          box.setAttribute("id", "products");

              // Image
          let img = document.createElement('img');
          img.setAttribute('src', data[i].imageUrl)
          img.classList.add('img')

          let linkWrapper = document.createElement('a');
          linkWrapper.href = `product.html?id=${data[i]._id}`
          linkWrapper.appendChild(img)
       


            //Name, price, description
          let name = document.createElement('h2');
          name.innerHTML = data[i].name;
          

          let price = document.createElement('p');
          price.innerHTML = `${data[i].price / 100}.00$`;

          let description = document.createElement('p');
          description.innerHTML = data[i].description;

          // //Lenses
          // let lenses = document.createElement('p');
          // lenses.innerHTML = 'Lens options : ' + data[i].lenses;

          //Append them
          box.appendChild(linkWrapper);
          box.appendChild(name);
          box.appendChild(price);
          box.appendChild(description);
          // box.appendChild(lenses);

          // Append it to something!
          allProducts.appendChild(box);


          // Create anchor element.
          var a = document.createElement('a'); 
            
          // Set the href property.
          // a.href = "SingleProduct.html" + "?id=" + data[i]._id;  FYI
          a.href = `product.html?id=${data[i]._id}`; 

          // Create the text node for anchor element.
          var link = document.createTextNode("See lens options");
            
          // Append the text node to anchor element.
          a.appendChild(link); 
            
          // Set the title.
          a.title = "This is Link"; 
            

          // Append the anchor element .
          box.append(a);

          console.log(box)
        }
    })
    .catch(err => console.log('Error: Fetch request failed'))
