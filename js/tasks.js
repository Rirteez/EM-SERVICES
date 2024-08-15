let prenom = localStorage.getItem("prenom");
let app = document.getElementById("app");

document.getElementById("prenom").innerHTML = "Bonjour " + prenom;

let url = "http://localhost:3000/todos";

let btnAjouter = document.createElement('A');
btnAjouter.classList.add('btn', 'btn-secondary', 'mb-3');
btnAjouter.innerHTML = 'Nouvelle tâche';
app.appendChild(btnAjouter);


let divMenu = document.createElement('DIV');
let home = document.createElement('A');
home.innerHTML = "Home";
home.classList.add('mx-4');
home.style.color = 'white';
home.style.textDecoration = 'none';
home.style.cursor = 'pointer';
let stat = document.createElement('A');
stat.innerHTML = "Statistiques";
stat.classList.add('mx-4');
stat.style.color = 'white';
stat.style.textDecoration = 'none';
stat.style.cursor = 'pointer';
let logOut = document.createElement('A');
logOut.innerHTML = "Déconnexion";
logOut.classList.add('mx-4');
logOut.style.color = 'orange';
logOut.style.textDecoration = 'none';
logOut.style.cursor = 'pointer';
container1.appendChild(divMenu);
divMenu.appendChild(home);
divMenu.appendChild(stat);
divMenu.appendChild(logOut);

home.addEventListener('click', (e)=> {
    window.location.href = "tasks.html";
});
stat.addEventListener('click', (e)=> {
    window.location.href = "stat.html";
});
logOut.addEventListener('click', (e)=> {
    if(confirm("Appuyez sur 'OK' pour vous déconnecter.")){
        window.location.href = "index.html";
    }
});



fetch(url).then((datas)=>{
    datas.json().then((elements)=>{
        // Récuperation des datas dans un tableau
        let tasks = elements[0].todolist;

        // Creation div à cacher ou afficher selon
        let divAjouter = document.createElement('DIV');
        divAjouter.id = 'divAjouter';
        divAjouter.classList.add('col-6');
        divAjouter.style.maxHeight = '0'; 
        divAjouter.style.overflow = 'hidden'; 
        divAjouter.style.transition = 'max-height 0.5s ease-out';
        divAjouter.style.display = 'block';
        app.appendChild(divAjouter);
        let divAjout = document.createElement('DIV');
        divAjout.classList.add('my-2');
        divAjout.style.textAlign = 'center';
        divAjouter.appendChild(divAjout);

        // Formulaire
        let form = document.createElement('FORM');
        form.classList.add('form-control');
        form.innerHTML = 'Veuillez saisir les informations de la tâche à créer.'
        divAjout.appendChild(form);

        // Premier input
        let inputText = document.createElement('INPUT');
        inputText.classList.add('mt-2');
        inputText.type = 'text';
        inputText.style.width = '100%';
        inputText.style.border = '0.125rem solid #ced4da';
        inputText.style.borderRadius = '0.5rem';
        inputText.placeholder = 'Titre de la tâche';

        // Deuxieme input
        let inputTags = document.createElement('INPUT');
        inputTags.type = 'text';
        inputTags.style.width = '100%';
        inputTags.style.border = '0.125rem solid #ced4da';
        inputTags.style.borderRadius = '0.5rem';
        inputTags.classList.add('mt-2');
        inputTags.placeholder = 'Tags de la tâche (séparez les par des virgules)';
        
        form.appendChild(inputText);
        form.appendChild(inputTags);

        // Bouton Valider
        let btnValider = document.createElement('button');
        btnValider.type = 'submit';
        btnValider.classList.add('btn', 'btn-primary', 'my-2');
        btnValider.innerHTML = 'Valider';
        form.appendChild(btnValider);

        // Ouvrir le cadre ajouter une tache
        btnAjouter.addEventListener('click', (event) => {
            event.preventDefault();
            if(btnAjouter.innerHTML == 'Nouvelle tâche'){
                btnAjouter.innerHTML = 'Fermer';
                divAjouter.style.maxHeight = divAjouter.scrollHeight + 'px';
            }
            else{
                btnAjouter.innerHTML = 'Nouvelle tâche';
                divAjouter.style.maxHeight = '0';
            }
        });

        btnValider.addEventListener('click', async() => {
            let dateActuelle = new Date();
            let tagsUser = inputTags.value.split(',').map(tag => tag.trim());
            let data = {
                "text": inputText.value,
                "created_at": dateActuelle.value,
                "Tags": [
                    tagsUser,
                ],
                "is_complete": false
            }
         
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
    
                if (!response.ok) {
                    throw new Error(`Erreur HTTP! statut: ${response.status}`);
                }
                const result = await response.json();
                console.error('La tâche a été ajouté avec succès:', error);
            } catch (error) {
                console.error('Erreur lors de l\'ajout de la tâche:', error);
            }
        })

        
        


        // Boucle pour chaque tâche
        tasks.forEach(task => {
            // Creation de l'affichage des taches sous forme de cartes
            let divCard = document.createElement('DIV');
            divCard.classList.add('mt-2');

            let divCardBody = document.createElement('DIV');
            divCardBody.id = 'cardBody';
            divCardBody.classList.add('card-body', 'card');

            let cardTitle = document.createElement('H5');
            cardTitle.classList.add('card-title');
            cardTitle.innerHTML = task.text;

            let divButtons = document.createElement('DIV');

            let btnDelete = document.createElement('A');
            btnDelete.classList.add('btn', 'btn-danger');
            btnDelete.style.opacity = '0';
            btnDelete.innerHTML = 'Supprimer';

            let btnDetail = document.createElement('A');
            btnDetail.classList.add('btn', 'btn-primary', 'ms-2');
            btnDetail.innerHTML = 'Détails';
            btnDetail.href = "item.html?id="+task.id;

            divCardBody.addEventListener('mouseenter', function() {
                btnDelete.style.transition = 'opacity 0.2s ease';
                btnDelete.style.opacity = '1';
            });

            divCardBody.addEventListener('mouseleave', function() {
                btnDelete.style.transition = 'opacity 0.2s ease';
                btnDelete.style.opacity = '0';
            });


            // Attribution des elements a la div app
            divCardBody.appendChild(cardTitle);
            divButtons.appendChild(btnDelete);
            divButtons.appendChild(btnDetail);
            divCardBody.appendChild(divButtons);
            divCard.appendChild(divCardBody);

            // Enregistrement de l'id dans le local storage au click
            btnDetail.addEventListener('click', (e)=> {
                e.preventDefault();
                localStorage.setItem('taskID', task.id);                
                window.location.href = btnDetail.href;
            });
            app.appendChild(divCard);

            btnDelete.addEventListener('click', async() => {
                if (confirm("Vous êtes sur le point de supprimer la tâche « " + task.text + " » !")) {
                    try {
                        const response = await fetch(url + '/' + task.id, {
                            method: 'DELETE'
                        });
                
                        if (!response.ok) {
                            throw new Error(`Erreur HTTP! statut: ${response.status}`);
                        }
                        divCard.remove();
                        console.error('La tâche a été supprimé avec succès:', error);
                    } catch (error) {
                        console.error('Erreur lors de la suppresion de la tâche:', error);
                    }
                }
            });
        });
    })
})