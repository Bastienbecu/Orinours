
fetch('http://localhost:3000/api/teddies')
  .then(response => response.json())
  .then(response => { 
     console.log(response);

    //Je créer ma variable que je vais ajouter à mes elements
    let html = "";

    // Boucle pour récupére toutes les variables des produits 
    for(let i = 0; i < response.length; i++) {
      console.log(response[i].name);
       

      // Créer les produits html
      html += `<div class="prodindex">
      <a href="./produit.html?${response[i]._id}">
      <h2 >${response[i].name} </h2>
      <p><img class="imgindex" src="${response[i].imageUrl}" alt="Images ours"></p>
      <p>${response[i].description}</p>
      <p >${(response[i].price/100).toFixed(2).replace(".",",")}€</p>
      <a href="./produit.html?${response[i]._id}"><button class="buttonindex">Voir l'article</button></a>
      </a> </div>`
    }
    
     // Ajouter mes element créer dans le HTML pour afficher mes produits
    document.getElementById("bear").innerHTML = html
})

// Message d'erreur
.catch(e => {
  alert("Veuillez reessayez ulterieurement (api pas connecté)");
});





