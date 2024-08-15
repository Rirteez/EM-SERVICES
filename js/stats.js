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



const barCanvas = document.getElementById("barCanvas");
let url = "http://localhost:3000/todos";

let taskAll = 0;
let taskFinished = 0;
let taskRuning = 0;

fetch(url).then((datas)=>{
    datas.json().then((elements)=>{
        let tasks = elements[0].todolist;
        // Boucle pour chaque tâche
        tasks.forEach(task => {
            if(task.is_complete){
                taskFinished += 1;
            } else {
                taskRuning += 1;
            }
            taskAll += 1;
        });
        const barChart = new Chart(barCanvas, {
            type: "bar",
            data: {
                labels: ["Nombre de tâches totales", "Nombre de tâches terminées", "Nombre de tâches en cours de réalisation"],
                datasets: [{
                    data: [taskAll, taskFinished, taskRuning], 
                    backgroundColor: [
                        'rgba(26, 188, 156, 0.35)',
                        'rgba(44, 62, 80, 0.35)',
                        'rgba(33, 37, 41, 0.35)'
                    ],
                    borderColor: [
                        'rgba(26, 188, 156, 1)',
                        'rgba(44, 62, 80, 1)',
                        'rgba(33, 37, 41, 1)'
                    ], 
                    borderWidth: 1
                }]
            }
        })
    });
})