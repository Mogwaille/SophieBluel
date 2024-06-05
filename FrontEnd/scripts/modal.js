// Déclaration de variables et de constantes    
let modal = null
const focusableSelector = "button, a, input, textarea"
let focusables = []
let previouslyFocusdElement = null


// Création de la fonction pour ouvrir la modale
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
    document.querySelectorAll(".js-modal-close").forEach((btn) => {
        btn.addEventListener("click", closeModal)
    })
}


// Fonction pour montrer l'aperçu de l'image sélectionner et cacher le logo d'image
const fileInput = document.querySelector("#add-photo-input");
const apercuImage = document.querySelector("#apercuImage");
const logoImg = document.querySelector("#logoImg");
const addPhotoLabel = document.querySelector(".add-photo-input");
const addPhotoText = document.querySelector(".add-photo p");

fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            apercuImage.src = e.target.result;
            apercuImage.style.display = "block";
            logoImg.style.display = "none";
            addPhotoLabel.style.display = "none";
            addPhotoText.style.display = "none";
        }
        reader.readAsDataURL(file);
    }
});


// Déclaration de plusieurs constantes pour la seconde modale
const form = document.getElementById('form');
const inputTitle = document.getElementById("title");
const selectCategory = document.getElementById("categories");
const imageFile = document.getElementById("add-photo-input");
const validateButton = document.getElementById("submit");


// Création de la fonction pour modifier le bouton valider
function checkFormInputs() {
    if (imageFile.files.length > 0 && inputTitle.value && selectCategory.value !== "0") {
        validateButton.removeAttribute('disabled');
    } else {
        validateButton.setAttribute('disabled', 'disabled');
    }
}
checkFormInputs();


// Ajout d'EventListener sur les champs
inputTitle.addEventListener("input", checkFormInputs);
selectCategory.addEventListener("change", checkFormInputs);
imageFile.addEventListener("change", checkFormInputs);

const addImageAPI = async (event) => {
    event.preventDefault();

    // Récupérer les valeurs actuelles des champs
    const titleValue = inputTitle.value;
    const categoryValue = selectCategory.value;
    const imageFileValue = imageFile.files[0];

    // Créer un nouvel objet FormData et y ajouter les valeurs des champs
    const formData = new FormData();
    formData.append("title", titleValue);
    formData.append("category", categoryValue);
    formData.append("image", imageFileValue);

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` },
            body: formData
        });
        const result = await response.json();
        if (response.ok) {
            console.log("Image ajoutée avec succès", result);

            galleryModal.innerHTML = "";
            form.reset();
            back();
            // Mettre à jour la galerie avec les nouvelles données
            const works = await apiWorks();
            updateGallery(works);
        } else {
            console.error("Erreur lors de l'ajout de l'image", result);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image", error);
    }
};


// Ajout d'un EventListener sur le bouton valider
validateButton.addEventListener("click", addImageAPI);


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


// Création de la fonction pour stopper la propagation
const stopPropagation = function (e) {
    e.stopPropagation()
}


// Création de la fonction pour se déplacer avec tab
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

function back(){
    firstModal.style.display = "block";
    secondModal.style.display = "none";
}

modalBack.addEventListener('click', function (){
    back();
})