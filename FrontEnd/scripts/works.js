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

        galleryModal.appendChild(newFigure)
        newFigure.appendChild(newImg)
        newFigure.appendChild(newFigcaption)
    })

}