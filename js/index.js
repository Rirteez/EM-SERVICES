let form = document.getElementById("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    let nom = document.getElementById("prenom").value;
    if(nom == ''){
        alert("Veuillez saisir votre identifiant");
    } else {
        localStorage.setItem("prenom", nom);
        window.location.href = "tasks.html";
    }
});