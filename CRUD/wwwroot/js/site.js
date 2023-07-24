const uri = 'api/movies';
let movies = [];

function getMovies() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayMovies(data))
        .catch(err => console.error('unable to get movies', err));
}

function addMovie() {
    const addTitleTextbox = document.getElementById('add-title');
    const addDescriptionTextbox = document.getElementById('add-description');
    const addGenreTextbox = document.getElementById('add-genre');
    const addEstudioTextbox = document.getElementById('add-estudio');
    const addPriceTextbox = document.getElementById('add-price');

    const movie = {
        titulo: addTitleTextbox.value.trim(),
        descripcion: addDescriptionTextbox.value.trim(),
        genero: addGenreTextbox.value.trim(),
        estudio: addEstudioTextbox.value.trim(),
        precio: addPriceTextbox.value
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then(response => response.json())
        .then(() => {
            getMovies();
            addTitleTextbox.value = '';
            addDescriptionTextbox.value = '';
            addGenreTextbox.value = '';
            addEstudioTextbox.value = '';
            addPriceTextbox.value = 0;
        })
        .catch(error => console.error('unable to add movie', error));
}

function deleteMovie(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(() => getMovies())
        .catch(error => console.error('unable to delete movie', error));
}

function displayEditForm(id) {
    document.getElementById('addForm').style.display = 'none';
    const movie = movies.find(movie => movie.id === id);

    document.getElementById('edit-id').value = movie.id
    document.getElementById('edit-title').value = movie.titulo
    document.getElementById('edit-description').value = movie.descripcion
    document.getElementById('edit-genre').value = movie.genero
    document.getElementById('edit-estudio').value = movie.estudio
    document.getElementById('edit-price').value = movie.precio
    document.getElementById('editForm').style.display = 'block';
}

function updateMovie() {
    const movieId = document.getElementById('edit-id').value;
    const moviePrice = document.getElementById('edit-price').value;

    const movie = {
        id: parseInt(movieId, 10),
        titulo: document.getElementById('edit-title').value,
        descripcion: document.getElementById('edit-description').value,
        genero: document.getElementById('edit-genre').value,
        estudio: document.getElementById('edit-estudio').value,
        precio: parseInt(moviePrice, 10),
    };

    fetch(`${uri}/${movieId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(movie)
    })
        .then(() => getMovies())
        .catch(error => console.error('Unable to update movie', error));

    closeInput();

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
    document.getElementById('addForm').style.display = 'block';
}

function _displayCount(movieCount) {
    const name = (movieCount === 1) ? 'movie' : 'movies';

    document.getElementById('counter').innerText = `${movieCount} ${name}`;
}

function _displayMovies(data) {
    const tBody = document.getElementById('movies');
    tBody.innerText = '';

    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(movie => {
        let editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute('onclick', `displayEditForm(${movie.id})`);

        let deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('onclick', `deleteMovie(${movie.id})`);

        let tr = tBody.insertRow();

        let td1 = tr.insertCell(0);
        let textNodeId = document.createTextNode(movie.id)
        td1.appendChild(textNodeId);

        let td2 = tr.insertCell(1);
        let textNodeTitle = document.createTextNode(movie.titulo)
        td2.appendChild(textNodeTitle);

        let td3 = tr.insertCell(2);
        let textNodeDescription = document.createTextNode(movie.descripcion)
        td3.appendChild(textNodeDescription);

        let td4 = tr.insertCell(3);
        let textNodeGenre = document.createTextNode(movie.genero)
        td4.appendChild(textNodeGenre);

        let td5 = tr.insertCell(4);
        let textNodeEstudio = document.createTextNode(movie.estudio)
        td5.appendChild(textNodeEstudio);

        let td6 = tr.insertCell(5);
        let textNodePrice = document.createTextNode(movie.precio)
        td6.appendChild(textNodePrice);

        let td7 = tr.insertCell(6);
        td7.appendChild(editButton);

        let td8 = tr.insertCell(7);
        td8.appendChild(deleteButton);
    });

    movies = data;
}