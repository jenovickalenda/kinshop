const produits = [
  { id: 1, nom: "Maillot Real Madrid", prix: 35, image: "images/WhatsApp Image 2026-09-21 at 17.15.45.jpeg" },
  { id: 2, nom: "Maillot FC Barcelone", prix: 30, image: "images/WhatsApp Image 2026-09-21 at 17.15.46.jpeg" },
  { id: 3, nom: "Maillot Léopards RDC", prix: 25, image: "images/WhatsApp Image 2026-09-21 at 17.27.50 (1).jpeg" },
  { id: 4, nom: "Maillot vita club", prix: 20, image: "images/WhatsApp Image 2026-09-21 at 17.27.50.jpeg" },
  { id: 5, nom: "Maillot Bayern", prix: 32, image: "images/WhatsApp Image 2026-09-21 at 17.27.49.jpeg" },
  { id: 6, nom: "Maillot PSG", prix: 33, image: "images/WhatsApp Image 2026-09-21 at 17.15.46 (1).jpeg" }
];

// On charge le panier sauvegardé ou on crée un vide
let panier = JSON.parse(localStorage.getItem('kinshop')) || [];

const container = document.getElementById('liste-produits');
const compteurSpan = document.getElementById('compteur');
const panierDetail = document.getElementById('panier-detail');

// AFFICHAGE PRODUITS
function afficherProduits(){
  container.innerHTML = "";
  produits.forEach(p => {
    container.innerHTML += `
      <div class="carte">
        <img src="${p.image}" onerror="this.src='https://via.placeholder.com/200?text=Maillot'">
        <h3>${p.nom}</h3>
        <p class="prix">${p.prix}$</p>
        <button onclick="ajouterAuPanier(${p.id})">Ajouter</button>
      </div>
    `;
  });
}

// LOGIQUE PANIER
function ajouterAuPanier(id){
  // 1. Est-ce que le produit est déjà dans le panier ?
  let produitDansPanier = panier.find(p => p.id === id);

  if(produitDansPanier){
    // Si oui -> on augmente juste la quantité
    produitDansPanier.quantite++;
  } else {
    // Si non -> on le trouve dans le stock et on l'ajoute avec quantite = 1
    let produitStock = produits.find(p => p.id === id);
    panier.push({ ...produitStock, quantite: 1 });
  }
  
  sauvegarder();
}

function sauvegarder(){
  localStorage.setItem('kinshop', JSON.stringify(panier));
  afficherPanier();
}

function afficherPanier(){
  let total = 0;
  let totalQte = 0;
  panierDetail.innerHTML = "<h3>Ton Panier</h3>";

  if(panier.length === 0){
    panierDetail.innerHTML += "<p>Vide</p>";
  }

  panier.forEach(p => {
    total += p.prix * p.quantite;
    totalQte += p.quantite;
    panierDetail.innerHTML += `<p>${p.nom} x${p.quantite} = ${p.prix * p.quantite}$</p>`;
  });

  compteurSpan.textContent = totalQte;
  if(total > 0) panierDetail.innerHTML += `<strong>Total: ${total}$</strong>`;
}

// LANCEMENT
afficherProduits();
afficherPanier();