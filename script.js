const dateElement = document.getElementById("date");
const liste = document.getElementById("liste-taches");
const input = document.getElementById("input");

let LISTE, id;

let data = localStorage.getItem("AFAIRE");

if(data){
    LISTE = JSON.parse(data);
    id = LISTE.length;
    loadListe(LISTE);
}else{
    LISTE = [];
    id = 0;
}

function loadListe (array){
    array.forEach(function(tache){
        ajouterTache(tache.name, tache.id, tache.trash);
    });
}


const options = {weekday:"long", day:"numeric", month:"long", year:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("fr-FR", options);

function ajouterTache(aFaire, id, trash){

    if(trash){return;}

    const tache = `<li class="tache">
                    <input type="checkbox">
                    <p class="texte">${aFaire}</p>
                    <i class="fa-regular fa-trash-can" job="supprimer" id="${id}"></i>
                    </li>
                `;

    const position ="beforeend";

    liste.insertAdjacentHTML(position, tache);
}

document.addEventListener("keyup",function(KeyboardEvent){
    if(KeyboardEvent.key == "Enter"){
        const aFaire = input.value;

        if(aFaire){
            ajouterTache(aFaire, id);

            LISTE.push({
                name : aFaire,
                id: id,
                trash: false
            });

            localStorage.setItem("AFAIRE", JSON.stringify(LISTE));

            id++;
        }
        input.value = "";
    }
});

function supprimerTache(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LISTE[element.id].trash = true;
}

liste.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "supprimer"){
        supprimerTache(element);
    }

    localStorage.setItem("AFAIRE", JSON.stringify(LISTE));
});