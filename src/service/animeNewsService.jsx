export const fetchAnimeNews = async (animeId) => {
  if (!animeId) {
    throw new Error("Invalid anime ID");
  }

  const response = await fetch(`/api/anime/news?animeId=${animeId}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch anime news");
  }

  const data = await response.json();
  return data || [];
};
