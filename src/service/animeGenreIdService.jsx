export const fetchAnimeByGenreId = async (genreId) => {
  try {
    const response = await fetch(`/api/anime/genre/${genreId}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Failed to fetch anime by genre");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
