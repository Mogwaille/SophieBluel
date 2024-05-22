// Afficher les works dans la gallery
const gallery = document.querySelector(".gallery");
const galleryModal = document.querySelector(".gallery-modal");

function showWorks(workData){

    workData.forEach(element => {

        newFigure = document.createElement("figure")
        newFigure.id = element.id

        newImg = document.createElement("img")
        newImg.src = element.imageUrl
        newImg.alt = element.title

        newFigcaption = document.createElement("figcaption")
        newFigcaption.innerText = element.title

        gallery.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(newFigcaption)
    })

    workData.forEach(element => {

        newFigure = document.createElement("figure")
        newFigure.id = element.id

        newImg = document.createElement("img")
        newImg.src = element.imageUrl
        newImg.alt = element.title

        deleteFigure = document.createElement('button');
        deleteFigure.classList.add('btn-delete');
        deleteFigure.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteFigure.setAttribute('data-id', element.id);

        galleryModal.appendChild(newFigure);
        newFigure.appendChild(newImg);
        newFigure.appendChild(deleteFigure);

        deleteFigure.addEventListener("click", async function(e) {
            e.preventDefault();

            // Supprimer l'image de l'API
            await deleteImageAPI(element.id);

            // Supprimer l'élément du DOM dans les deux galeries
            const figureGallery = document.getElementById(`gallery-${element.id}`);
            const figureModal = document.getElementById(`modal-${element.id}`);
            if (figureGallery) figureGallery.remove();
            if (figureModal) figureModal.remove();
        });
    })

}

const idDelete = document.querySelectorAll('.btn-delete[data-id]')

// Fonction pour supprimer l'image de l'API
const deleteImageAPI = async (idDelete) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:5678/api/works/${idDelete}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` }
        });
        if (response.ok) {
            console.log(`Work with id ${idDelete} has been deleted successfully.`);
        } else {
            console.error(`Erreur HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error("Erreur lors de la suppression de l'image :", error);
    }
}