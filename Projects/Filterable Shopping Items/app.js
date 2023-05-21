
let products = [];

const cardsContainer = document.querySelector(".filterable_cards");

document.addEventListener('DOMContentLoaded', () => {
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        products = data.products;
        //console.log(products);
        products.forEach(product => AddProduct(product));

      })
      .catch(error => console.error('Error:', error));
});

function AddProduct(product){
    
    let card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-name", product.data_name);
    card.innerHTML = `<img src="${product.src}" alt="${product.name}">
                       <div class="card-body">
                            <h6 class="card-title">${product.type}</h6>
                            <p class="card-text">${product.text}</p>
                       </div>`;
                       
    cardsContainer.appendChild(card);
}