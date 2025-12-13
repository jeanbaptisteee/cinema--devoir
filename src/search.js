import { searchMovies } from './api.js';


const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('search-results-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const statusMessage = document.getElementById('status-message');

let currentQuery = "";
let currentPage = 1;
let debounceTimer = null;


searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    if (query.length < 3) {
        resultsContainer.innerHTML = '';
        statusMessage.textContent = "Tapez au moins 3 caractères...";
        loadMoreBtn.style.display = 'none';
        return;
    }

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        currentQuery = query;
        currentPage = 1;
        resultsContainer.innerHTML = ''; // On vide les anciens résultats
        lancerRecherche();
    }, 500);
});


async function lancerRecherche() {
    statusMessage.textContent = "Recherche en cours...";

    const data = await searchMovies(currentQuery, currentPage);

    if (data.Search && data.Search.length > 0) {
        statusMessage.textContent = "";
        afficherFilms(data.Search);

        if (data.totalResults > currentPage * 10) {
            loadMoreBtn.style.display = 'block';
            loadMoreBtn.disabled = false;
        } else {
            loadMoreBtn.style.display = 'none';
        }
    } else {
        statusMessage.textContent = "Aucun film trouvé 😢";
        loadMoreBtn.style.display = 'none';
    }
}

function afficherFilms(films) {
    const fallbackImage = "https://media.istockphoto.com/id/1010879438/fr/vectoriel/barre-de-chargement-barre-de-progression-signe-de-chargement-fond-noir-illustration.jpg?s=612x612&w=0&k=20&c=OY8AAPEbciYbTx4JxKdNgLIaE_745Tivtj1O1uqqyvY=";

    films.forEach(film => {
        const div = document.createElement('div');
        div.className = 'movie-card';

        const posterSrc = (film.Poster && film.Poster !== "N/A") ? film.Poster : fallbackImage;

        div.innerHTML = `
            <div class="card-image">
                <img 
                    src="${posterSrc}" 
                    alt="${film.Title}"
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                >
            </div>
            <div class="card-content">
                <h3>${film.Title}</h3>
                <p class="year">${film.Year}</p>
                <a href="movie.html?id=${film.imdbID}" class="btn-details">En savoir plus</a>
            </div>
        `;

        resultsContainer.appendChild(div);
    });
}

loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    lancerRecherche();
});