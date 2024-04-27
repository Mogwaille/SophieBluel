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