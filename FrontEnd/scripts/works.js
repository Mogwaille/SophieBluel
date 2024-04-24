// Afficher les travaux dans la gallerie

const gallery = document.querySelector(".gallery");

function showWorks(workData){

    workData.forEach(element => {

        newFigure = document.createElement('figure');
        newFigure.id = element.id;

        newImg = document.createElement('img');
        newImg.src = element.imageUrl;
        newImg.alt = element.title;

        newFigcaption = document.createElement('figcaption');
        newFigcaption.innerText = element.title;

        gallery.appendChild(newFigure);
        newFigure.appendChild(newImg);
        newFigure.appendChild(newFigcaption);
    })

}