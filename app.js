// LISTE DE TOUS TES MAILLOTS EN VENTE
const produits = [
  { id: 1, nom: "Maillot Real Madrid", prix: 35, image: "images/WhatsApp Image 2026-09-21 at 17.15.45.jpeg" },
  { id: 2, nom: "Maillot FC Barcelone", prix: 30, image: "images/WhatsApp Image 2026-09-21 at 17.15.46.jpeg" },
  { id: 3, nom: "Maillot Léopards RDC", prix: 25, image: "images/WhatsApp Image 2026-09-21 at 17.27.50 (1).jpeg" },
  { id: 4, nom: "Maillot vita club", prix: 20, image: "images/WhatsApp Image 2026-09-21 at 17.27.50.jpeg" },
  { id: 5, nom: "Maillot Bayern", prix: 32, image: "images/WhatsApp Image 2026-09-21 at 17.27.49.jpeg" },
  { id: 6, nom: "Maillot PSG", prix: 33, image: "images/WhatsApp Image 2026-09-21 at 17.15.46 (1).jpeg" }
];

// On essaye de récupérer l'ancien panier dans la mémoire du téléphone
// Si il n'y a rien, on commence avec un tableau vide []
let panier = JSON.parse(localStorage.getItem('kinshop')) || [];

// On récupère les zones de la page HTML où on va afficher les choses
const container = document.getElementById('liste-produits'); // la grille des maillots
const compteurSpan = document.getElementById('compteur'); // le petit nombre en haut
const panierDetail = document.getElementById('panier-detail'); // le détail du panier

// FONCTION 1 : AFFICHER TOUS LES MAILLOTS À VENDRE
function afficherProduits(){
  container.innerHTML = ""; // on vide d'abord
  // Pour chaque maillot dans la liste produits...
  produits.forEach(p => {
    // ...on crée une carte HTML
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

// FONCTION 2 : QUAND ON CLIQUE SUR "AJOUTER"
function ajouterAuPanier(id){
  // On cherche si le maillot est déjà dans le panier
  let produitDansPanier = panier.find(p => p.id === id);

  if(produitDansPanier){
    // Si il est déjà là, on augmente seulement la quantité (ex: 1 -> 2)
    produitDansPanier.quantite++;
  } else {
    // Si il n'est pas là, on le cherche dans le stock
    let produitStock = produits.find(p => p.id === id);
    // ... = copie toutes les infos (nom, prix, image) et on ajoute quantite: 1
    panier.push({ ...produitStock, quantite: 1 });
  }
  // On sauvegarde
  sauvegarder();
}

// FONCTION 3 : SAUVEGARDER DANS LE TÉLÉPHONE ET RÉAFFICHER LE PANIER
function sauvegarder(){
  // localStorage garde le panier même si on ferme la page
  localStorage.setItem('kinshop', JSON.stringify(panier));
  afficherPanier(); // on met à jour l'affichage
}

// FONCTION 4 : AFFICHER LE CONTENU DU PANIER
function afficherPanier(){
  let total = 0; // prix total
  let totalQte = 0; // nombre total de maillots
  panierDetail.innerHTML = "<h3>Ton Panier</h3>";

  // Si panier vide
  if(panier.length === 0){
    panierDetail.innerHTML += "<p>Vide</p>";
  }

  // Pour chaque maillot dans le panier
  panier.forEach(p => {
    total += p.prix * p.quantite; // on additionne le prix
    totalQte += p.quantite; // on additionne la quantité
    // On affiche avec les 3 boutons : - + et X (supprimer)
    panierDetail.innerHTML += `
      <p>${p.nom} x${p.quantite} = ${p.prix * p.quantite}$ 
        <button onclick="changerQte(${p.id}, -1)">-</button>
        <button onclick="changerQte(${p.id}, 1)">+</button>
        <button onclick="supprimer(${p.id})" style="background:red; color:white;">X</button>
      </p>`;
  });

  compteurSpan.textContent = totalQte; // on met à jour le compteur en haut
  if(total > 0) panierDetail.innerHTML += `<strong>Total: ${total}$</strong>`;
}

// FONCTION 5 : CHANGER LA QUANTITÉ AVEC - OU +
function changerQte(id, valeur){
  let prod = panier.find(p => p.id === id); // on trouve le maillot
  prod.quantite += valeur; // on ajoute -1 ou +1

  if(prod.quantite <= 0){
    // Si quantité tombe à 0, on le supprime complètement
    supprimer(id);
  } else {
    // Sinon on sauvegarde
    sauvegarder();
  }
}

// FONCTION 6 : SUPPRIMER UN MAILLOT AVEC LE BOUTON X
function supprimer(id){
  // filter = garde tout SAUF celui avec cet id
  panier = panier.filter(p => p.id !== id);
  sauvegarder();
}

// AU DÉMARRAGE DE LA PAGE : on affiche tout
afficherProduits();
afficherPanier();

// FONCTION 7 : BOUTON COMMANDER WHATSAPP
document.getElementById('btn-commander').addEventListener('click', () => {
  if(panier.length === 0) return alert("Ton panier est vide !");
  
  let message = "Slt KINSHOP, je veux commander:%0A"; // %0A = retour à la ligne
  let total = 0;
  
  // On construit le message avec chaque produit
  panier.forEach(p => {
    message += `- ${p.nom} x${p.quantite} (${p.prix * p.quantite}$)%0A`;
    total += p.prix * p.quantite;
  });
  
  message += `%0ATotal: ${total}$%0AAdresse de livraison: `;
  
  let numero = "243972153392"; // ton numéro
  window.open(`https://wa.me/${numero}?text=${message}`, "_blank"); // ouvre WhatsApp
});