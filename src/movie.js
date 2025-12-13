import { getMovieById } from './api.js';

// 1. Récupération de l'ID dans l'URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

const container = document.getElementById('movie-details-container');

// 2. Fonction principale
async function init() {
    if (!movieId) {
        container.innerHTML = "<p>Erreur : Aucun film spécifié.</p>";
        return;
    }

    container.innerHTML = "<p>Chargement des détails...</p>";

    const movie = await getMovieById(movieId);

    if (!movie) {
        container.innerHTML = "<p>Erreur : Impossible de charger le film.</p>";
        return;
    }

    afficherDetails(movie);
}

// 3. Affichage des données
function afficherDetails(movie) {
    const fallbackImage = "https://media.istockphoto.com/id/1010879438/fr/vectoriel/barre-de-chargement-barre-de-progression-signe-de-chargement-fond-noir-illustration.jpg?s=612x612&w=0&k=20&c=OY8AAPEbciYbTx4JxKdNgLIaE_745Tivtj1O1uqqyvY=";

    // Vérification initiale
    const posterSrc = (movie.Poster && movie.Poster !== 'N/A') ? movie.Poster : fallbackImage;

    const ratingsHtml = movie.Ratings.map(r =>
        `<span class="badge">${r.Source} : ${r.Value}</span>`
    ).join(' ');

    container.innerHTML = `
        <div class="movie-header">
            <h1>${movie.Title} <span class="year">(${movie.Year})</span></h1>
        </div>
        
        <div class="movie-content">
            <div class="movie-poster">
                <img 
                    src="${posterSrc}" 
                    alt="Affiche de ${movie.Title}"
                    onerror="this.onerror=null; this.src='${fallbackImage}';"
                >
            </div>
            
            <div class="movie-info">
                <p><strong>Genre :</strong> ${movie.Genre}</p>
                <p><strong>Acteurs :</strong> ${movie.Actors}</p>
                <p><strong>Réalisateur :</strong> ${movie.Director}</p>
                <div class="ratings-section">
                   <strong>Notes :</strong> ${ratingsHtml || "Aucune note"}
                </div>
                <div class="plot-box">
                    <h3>Résumé</h3>
                    <p>${movie.Plot}</p>
                </div>
                <a href="search.html" class="btn-back">← Retour à la recherche</a>
            </div>
        </div>
    `;
}

// Lancer le script
init();