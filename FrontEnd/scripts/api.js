// Fonction pour charger les works
const apiWorks = async () => {
    const response = await fetch("http://localhost:5678/api/works")
    return response.json()
}

// Fonction pour charger les categories
const apiCategories = async () => {
    const response = await fetch("http://localhost:5678/api/categories")
    return response.json()
}

// Fonction pour charger les users login
const apiLogin = async (email, password) => {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
    return response.json()
}