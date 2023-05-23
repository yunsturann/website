
// add products from json file. 
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

// filter cards

const filterBtns = document.querySelectorAll(".filter-btns button");

filterBtns.forEach(button => button.addEventListener("click", FilterCards));

function FilterCards(e){
  document.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");

  if(e.target.dataset.name === "all"){
    const filterableCards = document.querySelectorAll(".filterable_cards .card.hide");
    filterableCards.forEach(card => card.classList.remove("hide"));
    return;
  }

  const filterableCards = document.querySelectorAll(".filterable_cards .card");

  filterableCards.forEach(card =>{
    if(e.target.dataset.name != card.dataset.name){
      card.classList.add("hide");
    }else{
      card.classList.remove("hide");
    }
  });

}

