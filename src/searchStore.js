const STORAGE_KEY = "movie-searches";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

const readSearches = () => {
  const searches = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");

  if (!Array.isArray(searches)) {
    throw new Error("Saved movie searches are invalid.");
  }

  return searches;
};

const getTrendingSearches = (searches) =>
  [...searches].sort((a, b) => b.count - a.count).slice(0, 5);

export const getTrendingMovies = async () =>
  getTrendingSearches(readSearches());

export const updateSearchCount = async (searchTerm, movie) => {
  const searches = readSearches();
  const normalizedTerm = searchTerm.trim().toLowerCase();
  const existingSearch = searches.find(
    (search) => search.normalizedTerm === normalizedTerm,
  );

  if (existingSearch) {
    existingSearch.count += 1;
    existingSearch.title = movie.title;
    existingSearch.poster_url = movie.poster_path
      ? `${POSTER_BASE_URL}${movie.poster_path}`
      : "/no-movie.png";
  } else {
    searches.push({
      $id: normalizedTerm,
      normalizedTerm,
      count: 1,
      title: movie.title,
      poster_url: movie.poster_path
        ? `${POSTER_BASE_URL}${movie.poster_path}`
        : "/no-movie.png",
    });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
};
