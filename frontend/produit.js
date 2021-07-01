
/* Récupération de l'id du produit sélectionné dans la page précédente */
const productId = window.location.search.substr(1);

/* Récupération du produit avec l'id associé depuis le serveur */ 

fetch(`http://localhost:3000/api/teddies/${productId}`)
    .then((response) => response.json())
    .then(response => {
        
    let html="";

    // Affichage du produit / personalisation
    html += `<h2>${response.name}</h2>
        <p class="imgpdt" ><img src="${response.imageUrl}" alt="image d'ours en détails" ></p>
        <p>${response.description}</p>
        <p><b>Prix: ${(response.price/100).toFixed(2).replace(".",",")}€</b></p>`
    document.getElementById("produitdetail").innerHTML = html;
    
    let choice = document.querySelector(".section__choice");
    
    response.colors.forEach (function (colors) {
        let option = document.createElement("option");
        option.value = colors;
        option.textContent = colors;
        choice.appendChild(option);
    })

      //Évènement "click" : lance la fonction d'ajout du produit au panier                         ***********************
       let cartBtn = document.querySelector(".addCart");

    cartBtn.addEventListener('click', () => {
      let select = document.querySelector(".section__choice");
      response.selectColors = select.options[select.selectedIndex].value;
      addItemCart(response);

  })
})

    .catch(e => {
        
        console.log(e);
    });



function addItemCart (item) {

  let cartItem = []

  let saveItemCart = {
    _id: item._id,
    imageUrl: item.imageUrl,
    name: item.name,
    price: item.price,
    quantity: 1,
    selectColors: item.selectColors
  }

  let otherItem = true;
  // Si localStorage est vide elle crée un nouveau tableau cartItem et l'enregistre dans le localStorage
  if (localStorage.getItem('anyItem') === null) {
      cartItem.push(saveItemCart);
      localStorage.setItem('anyItem', JSON.stringify(cartItem));
  } 
  // Sinon elle récupère le tableau du localStorage, ajoute le nouveau produit, et enregistre le nouveau tableau.
  else { 
      cartItem = JSON.parse(localStorage.getItem('anyItem'));

      cartItem.forEach((prod) => {
          if (item._id === prod._id && item.selectColors === prod.selectColors) { 
              prod.quantity++;
              otherItem = false;
          }
      })
  if (otherItem) cartItem.push(saveItemCart);
  localStorage.setItem('anyItem', JSON.stringify(cartItem));
 }


};

