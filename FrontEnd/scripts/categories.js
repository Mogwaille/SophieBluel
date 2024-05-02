// Fonction pour filtrer les works en fonction de la categories
const filterWorks = (works, category) => {
    if (category === "Tous") {
        return works
    } else {
        return works.filter(work => work.category.name === category)
    }
}

// Fonction pour mettre à jour la gallery avec les works filtrés
const updateGallery = (filteredWorks) => {
    const gallery = document.querySelector(".gallery")
    gallery.innerHTML = ''
    showWorks(filteredWorks)
}

// Déclaration de la constante buttons
const buttons = document.querySelectorAll(".button")

// Fonction pour changer le selectedButton et filtrer les works
const changeSelectedButton = async (event) => {
    const category = event.target.textContent
    const works = await apiWorks()
    const filtrerWorks = filterWorks(works, category)
    updateGallery(filtrerWorks)

    // Changement de "button__selected"
    buttons.forEach(button => {
        button.classList.remove("button__selected")
    })
    event.target.classList.add("button__selected")
}

// Ajout d'un EventListener sur chaque boutons
buttons.forEach(button => {
    button.addEventListener("click", changeSelectedButton)
})
    
// Bouton "Tous" par défaut à l'actualisation
const buttonTous = document.querySelector(".button__selected")
changeSelectedButton({ target: buttonTous })