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


// Fonction pour envoyer une image sur l'API
const addImageAPI = async (event) => {
    event.preventDefault();
    const title = document.querySelector(".form-modal input#title").value;
    const category = document.querySelector(".form-modal-categories select#categories").value;
    const fileInput = document.querySelector(".add-photo input[type='file']");
    const imageFile = fileInput.files[0];
    if (!title || !category || !imageFile) {
        alert("Tous les champs doivent être remplis");
        return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", imageFile);
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
            updateGallery(event);
            closeModal(event);
        } else {
            console.error("Erreur lors de l'ajout de l'image", result);
        }
    } catch (error) {
        console.error("Erreur lors de l'ajout de l'image", error);
    }
};


// Fonction pour montrer l'aperçu de l'image sélectionner et cacher le logo d'image
const fileInput = document.querySelector("#add-photo-input");
const apercuImage = document.querySelector("#apercuImage");
const logoImg = document.querySelector("#logoImg");
    fileInput.addEventListener("change", function(event) {
    const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
            apercuImage.src = e.target.result;
            apercuImage.style.display = "block";
            logoImg.style.display = "none";
        }
    reader.readAsDataURL(file);
    }
});


// Ajout d'un EventListener sur le bouton valider
document.querySelector(".valider").addEventListener("click", addImageAPI);


// Modification du bouton valider après que tous les champs soient remplies
const titleInput = document.querySelector(".form-modal input#title");
const categoryInput = document.querySelector(".form-modal-categories select#categories");
const validateButton = document.querySelector(".valider");
const checkFields = () => {
const title = titleInput.value.trim();
const category = categoryInput.value.trim();
    if (title && category) {
        validateButton.classList.remove("valider");
        validateButton.classList.add("valider-after");
    } else {
        validateButton.classList.remove("valider-after");
        validateButton.classList.add("valider");
    }
};


// Ajout d'EventListener sur les champs
titleInput.addEventListener("input", checkFields);
categoryInput.addEventListener("change", checkFields);


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

modalBack.addEventListener('click', function (){
    firstModal.style.display = "block";
    secondModal.style.display = "none";
})