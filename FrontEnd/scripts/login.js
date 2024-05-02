// Fonction pour gérer le formulaire de connexion
const connexion = async (event) => {
    event.preventDefault()

    // Déclaration des constantes email et mot de passe
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    // Fonction pour stocker le token dans le localStorage
    const stockerToken = (token) => {
        localStorage.setItem("token", token)
        localStorage.setItem("connexion", "true")
        majLogin()
    } 

    // Fonction pour la connexion
    try {
        const response = await apiLogin(email, password)

        if (response.userId) {
            stockerToken(response.token)
            window.location.href = "index.html"
        } else {
            alert("Erreur dans l’identifiant ou le mot de passe")
        }
    } catch (error) {
        alert("Une erreur s\'est produite")
    }
}

// Ajouter d'un EventListener sur Se connecter
const seConnecter = document.querySelector("form.connexion")
seConnecter.addEventListener("submit", connexion)

// Fonction pour mettre à jour le bouton de connexion
const majLogin = () => {
    const boutonLogin = document.querySelector(".login")
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

// Mise à jour  par défaut du bouton de connexion à l'actualisation de la page
majLogin()