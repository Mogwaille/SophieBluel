// Déclaration de variables et de constantes    
let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusdElement = null

// Création de la function pour ouvrir la modale
const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute("href"))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusdElement = document.querySelector(":focus")
    modal.style.display = null
    focusables[0].focus()
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
}

// Création de la fonction pour fermer la modale
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusdElement !== null) previouslyFocusdElement.focus()
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
}

// Création de la function pour stopper la propagation
const stopPropagation = function (e) {
    e.stopPropagation()
}

// Création de la function pour se déplacer avec tab
const focusInModal = function (e) {
   e.preventDefault() 
   let index = focusables.findIndex(f => f === modal.querySelector(":focus"))
   if (e.shiftKey === true) {
        index--
   } else {
        index++
   }
   index++
   if (index >= focusables.length) {
        index = 0
   }
   if (index < 0) {
        index = focusables.length - 1
   }
   focusables[index].focus()
}

// Ajout de l'EventListener sur les .js-modal
document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

// Création de la fonction pour fermer la modale avec le clavier (et se déplacer avec tab)
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})