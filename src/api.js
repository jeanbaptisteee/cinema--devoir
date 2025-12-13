const urlApi = `https://www.omdbapi.com/?apikey=2593fe92`;
export async function searchMovies(title, page = 1, year = null) {
    if (!title) return { Search: [], totalResults: "0" };

    let url = `${urlApi}&s=${encodeURIComponent(title)}&page=${page}`;
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

export async function getMovieById(id) {
    // on utilise le paramètre 'i' pour ID et 'plot=full' pour le grand résumé
    const url = `${urlApi}&i=${id}&plot=full`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

        const data = await response.json();

        if (data.Response === "False") {
            throw new Error(data.Error);
        }
        return data;
    } catch (error) {
        console.error("Erreur getMovieById:", error);
        return null;
    }
}