

// Afficher le formulaire d'ajout
const boutonAfficher = document.getElementById("afficherDiv");
const maDiv = document.getElementById("maDiv"); 



boutonAfficher.addEventListener("click", function() {
    if (maDiv.classList.contains("uk-hidden")) {
        maDiv.classList.remove("uk-hidden");
    } else {
        maDiv.classList.add("uk-hidden");
    }
});


// Supprimer livre
function supprimerLigne(index) {
   
    var livres = JSON.parse(localStorage.getItem('livres'));

    
    
    livres.splice(index, 1);

 
    localStorage.setItem('livres', JSON.stringify(livres));

   
    var livresTable = document.getElementById('livres').getElementsByTagName('tbody')[0];

    livresTable.deleteRow(index);
}

// Editer livre

function editerLigne(index) {

   
    var livres = JSON.parse(localStorage.getItem('livres'));

  
    var ligne = livres[index];
    
    document.getElementById('titreEdition').value = ligne.titre;
    document.getElementById('auteurEdition').value = ligne.auteur;
    document.getElementById('prixEdition').value = ligne.prix;

    var sauv=document.getElementById('sauvegarderEdition') ; 
    sauv.addEventListener('click',function () {
 
   ligne.titre = document.getElementById('titreEdition').value;
   ligne.auteur = document.getElementById('auteurEdition').value;
   ligne.prix = document.getElementById('prixEdition').value;
   console.log("ligne after ms",ligne)


   livres[index] = ligne;
   localStorage.setItem('livres', JSON.stringify(livres));

   
   afficherLivres();
    })
   
}

function ajouterBoutonEditer(bouton, index) {
   
    bouton.addEventListener('click', function () {
        const maDiv2 = document.getElementById("maDiv2");
        if (maDiv2.classList.contains("uk-hidden")) {
            maDiv2.classList.remove("uk-hidden");
        } else {
            maDiv2.classList.add("uk-hidden");
        }
        editerLigne(index);
    });
}

// Afficher les livres
function afficherLivres() {
   
    var donnees = JSON.parse(localStorage.getItem('livres'));

    var livresTable = document.getElementById('livres').getElementsByTagName('tbody')[0];

while (livresTable.firstChild) {
    livresTable.removeChild(livresTable.firstChild);
}
    
    for (var i = 0; i < donnees.length; i++) {
        var row = livresTable.insertRow(i); 

        var cellTitre = row.insertCell(0);
        var cellAuteur = row.insertCell(1);
        var cellPrix = row.insertCell(2);
        var cellEditer = row.insertCell(3);
        var cellSupprimer = row.insertCell(4);

        cellTitre.innerHTML = donnees[i].titre;
        cellAuteur.innerHTML = donnees[i].auteur;
        cellPrix.innerHTML = donnees[i].prix;

        var boutonEditer = document.createElement('button');
        boutonEditer.className = 'uk-button uk-button-primary';
        boutonEditer.textContent = 'Editer';

        ajouterBoutonEditer(boutonEditer, i);
        cellEditer.appendChild(boutonEditer);

        var boutonSupprimer = document.createElement('button');
        boutonSupprimer.className = 'uk-button uk-button-danger';
        boutonSupprimer.textContent = 'Supprimer';

        boutonSupprimer.addEventListener('click', function (index) {
            
            return function () { 
               
                supprimerLigne(index);
            };
        }(i)); 
        cellSupprimer.appendChild(boutonSupprimer);
    }
}


// Ajouter livre
function ajouterLivre() {
   document.getElementById('formLivre').addEventListener('submit', function (event) {
        event.preventDefault(); 

        var titre = document.getElementById('titre').value;
        var auteur = document.getElementById('auteur').value;
        var prix = document.getElementById('prix').value;

       
        var livres = JSON.parse(localStorage.getItem('livres')) || [];

        livres.push({ titre: titre, auteur: auteur, prix: prix });

        localStorage.setItem('livres', JSON.stringify(livres));
        document.getElementById('formLivre').reset();
        
      
        afficherLivres();
    });
}

ajouterLivre() ;
afficherLivres();

