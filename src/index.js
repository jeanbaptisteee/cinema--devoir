import { searchMovies } from './api.js';

const container = document.getElementById('trending-container');
const loadMoreBtn = document.getElementById('load-more-trends');

let currentPage = 1;
const YEAR_TREND = '2024'; // On cible l'année demandée

// Fonction principale pour charger les tendances
async function loadTrends() {
    // Astuce : On cherche le mot "movie" ou "action" pour avoir une liste variée
    const query = "movie";

    try {
        // On appelle votre fonction searchMovies existante
        // (Titre, Page, Année)
        const data = await searchMovies(query, currentPage, YEAR_TREND);

        if (data.Search && data.Search.length > 0) {
            displayMovies(data.Search);

            // Si on a des résultats, on affiche le bouton pour la suite
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
            if(currentPage === 1) container.innerHTML = "<p>Aucun film trouvé pour 2024.</p>";
        }

    } catch (error) {
        console.error("Erreur chargement tendances :", error);
        container.innerHTML = "<p>Erreur lors du chargement des films.</p>";
    }
}

// Fonction d'affichage (Similaire à search.js mais adapté pour l'accueil)
function displayMovies(movies) {
    // URL de l'image de secours (ou ton image locale)
    const fallbackImage = "https://media.istockphoto.com/id/1010879438/fr/vectoriel/barre-de-chargement-barre-de-progression-signe-de-chargement-fond-noir-illustration.jpg?s=612x612&w=0&k=20&c=OY8AAPEbciYbTx4JxKdNgLIaE_745Tivtj1O1uqqyvY=";

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'movie-card';

        // Si l'API dit "N/A", on met direct l'image de secours.
        // Sinon, on tente de mettre l'image de l'API.
        const posterSrc = (movie.Poster && movie.Poster !== "N/A") ? movie.Poster : fallbackImage;

        card.innerHTML = `
            <div class="card-image">
                <img 
                    src="${posterSrc}" 
                    alt="${movie.Title}"
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                >
            </div>
            <div class="card-content">
                <h3>${movie.Title}</h3>
                <p class="year">${movie.Year}</p>
                <a href="movie.html?id=${movie.imdbID}" class="btn-details">En savoir plus</a>
            </div>
        `;

        container.appendChild(card);
    });
}

// Gestion du clic sur "Charger plus"
loadMoreBtn.addEventListener('click', () => {
    currentPage++; // On passe à la page suivante
    loadTrends();
});

// Lancement automatique au chargement de la page
loadTrends();
