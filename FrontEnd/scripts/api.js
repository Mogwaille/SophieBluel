const apiWorks = async() => {
    await fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then((data) => (workData = data))

    showWorks(workData);

}

apiWorks();