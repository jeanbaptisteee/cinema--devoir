const API_KEY = "VotreCléAPIICI";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;/**ICI FAUT METTRE L'API MAIS J'AI PAS RECU**/

export async function searchMovies(title, page = 1, year = null) {
    if (!title) return { Search: [], totalResults: "0" };

    let url = `${BASE_URL}&s=${encodeURIComponent(title)}&page=${page}`;
    if (year) {
        url += `&y=${encodeURIComponent(year)}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "False") {
        return { Search: [], totalResults: "0", Error: data.Error };
    }

    return data;
}

export async function getMovieDetails(imdbID) {
    if (!imdbID) throw new Error("imdbID est requis pour obtenir les détails du film.");
    const url = `${BASE_URL}&i=${encodeURIComponent(imdbID)}&plot=full`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    if (data.Response === "False") {
         throw new Error(`Erreur API: ${data.Error}`);
    }
    return data;
}