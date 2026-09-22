const produits = [
  { id: 1, nom: "Maillot Real Madrid", prix: 35, image: "images/WhatsApp Image 2026-09-21 at 17.15.45.jpeg" },
  { id: 2, nom: "Maillot FC Barcelone", prix: 30, image: "images/WhatsApp Image 2026-09-21 at 17.15.46.jpeg" },
  { id: 3, nom: "Maillot Léopards RDC", prix: 25, image: "images/WhatsApp Image 2026-09-21 at 17.27.50 (1).jpeg" },
  { id: 4, nom: "Maillot vita club", prix: 20, image: "images/WhatsApp Image 2026-09-21 at 17.27.50.jpeg" },
  { id: 5, nom: "Maillot Bayern", prix: 32, image: "images/WhatsApp Image 2026-09-21 at 17.27.49.jpeg" },
  { id: 6, nom: "Maillot PSG", prix: 33, image: "images/WhatsApp Image 2026-09-21 at 17.15.46 (1).jpeg" }
];

let panier = []

const container = document.getElementById('liste-produits');

produits.forEach(produit => {
  container.innerHTML += `
    <div class="carte">
        <img src="${produit.image}" alt="${produit.nom}">
        <h3>${produit.nom}</h3>
        <p class="prix">${produit.prix}$</p>
        <button onclick="ajouterAuPanier(${produit.id})">Ajouter au panier</button>
    </div>
  `;
});

function ajouterAuPanier(id) {
  const produitTrouve = produits.find(p => p.id === id);

  if (produitTrouve) {
    panier.push(produitTrouve);
    console.log("✅ Ajouté :", produitTrouve.nom);
    console.log("Panier actuel :", panier);
    alert(produitTrouve.nom + " ajouté au panier ! Total : " + panier.length);
  } else {
    console.log("❌ Produit non trouvé pour id:", id);
  }
}
// Rend la fonction visible pour le bouton
window.ajouterAuPanier = ajouterAuPanier;