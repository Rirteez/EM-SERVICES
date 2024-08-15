document.addEventListener('DOMContentLoaded',()=>{
    let taskId = localStorage.getItem('taskID');
    let app = document.getElementById('app');
    let h1 = document.querySelector("h1");
    let url = "http://localhost:3000/todos";

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


    // Récupérer les détails de la tâche choisie
    fetch(`http://localhost:3000/todos/${taskId}`)
        .then(response => response.json())
        .then(task => {
            h1.innerHTML = task.text;

            let btnDelete = document.createElement('A');
            btnDelete.classList.add('btn', 'btn-danger');
            btnDelete.innerHTML = 'Supprimer';

            let btnEtat = document.createElement('A');
            btnEtat.classList.add('btn', 'mx-2');
            if (task.is_complete){
                btnEtat.innerHTML = 'Terminée';
                btnEtat.classList.add('btn-success');
            } else {
                btnEtat.innerHTML = 'En cours';
                btnEtat.classList.add('btn-warning');
            }

            // div pour toutes les cases
            let divCases = document.createElement('DIV');

            // Création premiere case
            let divID = document.createElement('DIV');
            divID.classList.add('row','card','mt-2');
            // Colonne gauche
            let divIdG = document.createElement('DIV');
            divIdG.classList.add('col-8');
            // Contenu colonne gauche
            let pIDg = document.createElement('P');
            pIDg.classList.add('card-body','mb-0');
            pIDg.innerHTML = "Numéro d'ID : ";
            // Colonne droite
            let divIdD = document.createElement('DIV');
            divIdD.classList.add('col-4');
            // Contenu colonne droite
            let pIDd = document.createElement('P');
            pIDd.classList.add('card-body','mb-0');
            pIDd.innerHTML = task.id;
            // Appends child
            divID.appendChild(divIdG);
            divID.appendChild(divIdD);
            divIdG.appendChild(pIDg);
            divIdD.appendChild(pIDd);
            // -----------------------------------------------
            // Création deuxieme case
            let divDate = document.createElement('DIV');
            divDate.classList.add('row','card','mt-2');
            // Colonne gauche
            let divDateG = document.createElement('DIV');
            divDateG.classList.add('col-8');
            // Contenu colonne gauche
            let pDateG = document.createElement('P');
            pDateG.classList.add('card-body','mb-0');
            pDateG.innerHTML = "Date de création : ";
            // Colonne droite
            let divDateD = document.createElement('DIV');
            divDateD.classList.add('col-4');
            // Contenu colonne droite
            let pDateD = document.createElement('P');
            pDateD.classList.add('card-body','mb-0');
            pDateD.innerHTML = task.created_at;
            // Appends child
            divDate.appendChild(divDateG);
            divDate.appendChild(divDateD);
            divDateG.appendChild(pDateG);
            divDateD.appendChild(pDateD);
            // -----------------------------------------------
            // Création troisieme case
            let divTags = document.createElement('DIV');
            divTags.classList.add('row','card','mt-2');
            // Colonne gauche
            let divTagsG = document.createElement('DIV');
            divTagsG.classList.add('col-8');
            // Contenu colonne gauche
            let pTagsG = document.createElement('P');
            pTagsG.classList.add('card-body','mb-0');
            pTagsG.innerHTML = "Tags de la tâche : ";
            // Colonne droite
            let divTagsD = document.createElement('DIV');
            divTagsD.classList.add('col-4');
            // Contenu colonne droite
            let pTagsD = document.createElement('P');
            pTagsD.classList.add('card-body','mb-0');
            pTagsD.innerHTML = task.Tags;
            // Appends child
            divTags.appendChild(divTagsG);
            divTags.appendChild(divTagsD);
            divTagsG.appendChild(pTagsG);
            divTagsD.appendChild(pTagsD);
            // -----------------------------------------------
            // Création quatrieme case
            let divComplete = document.createElement('DIV');
            divComplete.classList.add('row','card','mt-2');
            // Colonne gauche
            let divCompleteG = document.createElement('DIV');
            divCompleteG.classList.add('col-8');
            // Contenu colonne gauche
            let pCompleteG = document.createElement('P');
            pCompleteG.classList.add('card-body','mb-0');
            pCompleteG.innerHTML = "Etat de la tâche : ";
            // Colonne droite
            let divCompleteD = document.createElement('DIV');
            divCompleteD.classList.add('col-4');
            // Contenu colonne droite
            let pCompleteD = document.createElement('P');
            pCompleteD.classList.add('card-body','mb-0');
            if(task.is_complete){
                pCompleteD.innerHTML = "Terminée";
            } else {
                pCompleteD.innerHTML = "En cours de réalisation";
            };

            // Appends child
            divComplete.appendChild(divCompleteG);
            divComplete.appendChild(divCompleteD);
            divCompleteG.appendChild(pCompleteG);
            divCompleteD.appendChild(pCompleteD);
            
            divCases.appendChild(divID);
            divCases.appendChild(divDate);
            divCases.appendChild(divTags);
            divCases.appendChild(divComplete);
            app.appendChild(btnDelete);
            app.appendChild(btnEtat);
            app.appendChild(divCases);

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
                    window.location.href = 'tasks.html';
                }
            });
            
            btnEtat.addEventListener('click', async() => {
                if (btnEtat.innerHTML == 'Terminée'){
                    
                    const MajComplete = {
                        is_complete: false
                    };
                    
                    try {
                        const response = await fetch(url + '/' + task.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(MajComplete)
                        });
                
                        if (!response.ok) {
                            throw new Error(`Erreur HTTP! statut: ${response.status}`);
                        }
                
                        const result = await response.json();
                        console.log('Tâche mise à jour avec succès:', result);
                        btnEtat.innerHTML = 'En cours';
                        btnEtat.classList.add('btn-warning');
                        btnEtat.classList.remove('btn-success');
                        window.location.reload();
                    } catch (error) {
                        console.error('Erreur lors de la mise à jour de la tâche:', error.message);
                    }
                } else {
                    const MajComplete = {
                        is_complete: true
                    };
                    
                    try {
                        const response = await fetch(url + '/' + task.id, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(MajComplete)
                        });
                
                        if (!response.ok) {
                            throw new Error(`Erreur HTTP! statut: ${response.status}`);
                        }
                
                        const result = await response.json();
                        console.log('Tâche mise à jour avec succès:', result);
                        btnEtat.innerHTML = 'Terminée';
                        btnEtat.classList.add('btn-success');
                        btnEtat.classList.remove('btn-warning');
                        window.location.reload();
                    } catch (error) {
                        console.error('Erreur lors de la mise à jour de la tâche:', error.message);
                    }
                }
            })

        });
});