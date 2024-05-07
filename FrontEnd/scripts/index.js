// Fonction pour gérer le formulaire de connexion
const connexion = async (event) => {
}

// Fonction pour mettre à jour le bouton de connexion
const majLogin = () => {
    const boutonLogin = document.getElementById("lienLogin")
    const estConnecte = localStorage.getItem("connexion")

    if (estConnecte === "true") {
        boutonLogin.innerHTML = "logout"
        boutonLogin.removeEventListener("click", connexion)
        boutonLogin.addEventListener("click", deconnexion)

        // Cacher la div filtres si l'utilisateur est connecté
        const divFiltres = document.querySelector(".filtres")
        divFiltres.style.display = "none"

        // Création lien "modifier" à droite du h2
        const createModifier = document.querySelector("#portfolio h2")
        createModifier.innerHTML += '<img class="pen" src="./assets/icons/pen-to-square-regular.png" alt="Logo modifier"> <a href="#modal1" class="modifier js-modal">Modifier</a>'

        // Création lien "Mode édition"
        const createEdition = document.querySelector(".edition")
        createEdition.innerHTML = '<div class="bannerEdition"><img class="pen2" src="./assets/icons/pen-to-square-regular-white.png" alt="Logo modifier"> <a href="#" id="modeEdition" class="modeEdition">Mode édition</a></div>'

    } else {
        boutonLogin.innerHTML = "login"
        boutonLogin.removeEventListener("click", deconnexion)
        boutonLogin.addEventListener("click", connexion)
    }
}

// Fonction pour la déconnexion
const deconnexion = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("connexion")
    majLogin()
}

// Mise à jour par défaut du bouton de connexion à l'actualisation de la page
majLogin()