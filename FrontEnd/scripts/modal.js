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
    addLogo();
}


// Fonction pour ajouter le logo poubelle, associer chaque logo à son image correspondante et supprimer l'image
const addLogo = function () {
    const images = document.querySelectorAll(".gallery-modal img");
    images.forEach(image => {
        const logoDiv = document.createElement("div");
        logoDiv.classList.add("logo-container");
        const logo = document.createElement("img");
        logo.src = "./assets/icons/trash-can-solid.png";
        logo.alt = "Logo de poubelle";
        logoDiv.appendChild(logo);
        image.parentNode.appendChild(logoDiv);

        // Associer le logo à son image correspondante
        logoDiv.addEventListener("click", function() {
            const imageCorrespondante = this.parentNode.querySelector("img");

            // Supprimer l'image de l'API
            deleteImageAPI(imageCorrespondante.src);
        });
    });
}


// Fonction pour supprimer l'image de l'API
const deleteImageAPI = async (imageURL) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5678/api/works/1", {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
            body: JSON.stringify({ imageURL })
        });
        const deleteResponse = await response.json();
        console.log(deleteResponse);
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
    }
}


// Foncton pour envoyer une image sur l'API
const addImageAPI = async (imageURL) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`},
            body: JSON.stringify({ imageURL })
        });
        const addResponse = await response.json();
        console.log(deleteResponse);
    } catch (error) {
        console.error("Erreur lors de l'envoie de l'image :", error);
    }
}


// Ajout d'un EventListener sur le bouton valider
document.querySelector(".valider").addEventListener("click", addImageAPI);


// Fonction sur le bouton "+ Ajouter photo" pour choisir une image
document.querySelector(".add-photo button").addEventListener("click", function() {
    const chooseImg = document.createElement("input");
    chooseImg.type = "file";
    chooseImg.accept = "image/*";
    chooseImg.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const imageLink = URL.createObjectURL(file);
            document.getElementById("apercuImage").src = imageLink;
            document.getElementById("logoImg").style.display = "none";
            document.getElementById("apercuImage").style.display = "block";
            document.getElementById("apercuImage").style.opacity = "100%";
            document.getElementById("apercuImage").style.width = "100%";
        }
    };
    chooseImg.click();
});


// Création de la fonction pour fermer la modale
const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusdElement !== null) previouslyFocusdElement.focus()
    e.preventDefault()
    window.setTimeout(function () {
        modal.style.display = "none"
        modal = null
    }, 500)
    modal.setAttribute("aria-hidden", true)
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


// Déclaration de plusieurs constantes
const btnAddWork = document.querySelector('.add-work');
const firstModal = document.querySelector('.first-modal');
const secondModal = document.querySelector('.second-modal');
const modalBack = document.querySelector('.modal-back')


// Fonctions pour passer d'une modale à l'autre
btnAddWork.addEventListener('click', function (){
    firstModal.style.display = "none";
    secondModal.style.display = "block";
})

modalBack.addEventListener('click', function (){
    firstModal.style.display = "block";
    secondModal.style.display = "none";
})