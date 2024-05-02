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
    } else {
        boutonLogin.innerHTML = "login"
        boutonLogin.removeEventListener("click", deconnexion)
        boutonLogin.addEventListener("click", connexion)
    }
}

// Fonction pour la déconnection
const deconnexion = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("connexion")
    majLogin()
}

// Mise à jour par défaut du bouton de connexion à l'actualisation de la page
majLogin()