export const fetchAnimeData = async (query) => {
  if (!query) {
    throw new Error("Search query is required");
  }

  const response = await fetch(`/api/anime/search?q=${encodeURIComponent(query)}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch anime data");
  }

  const data = await response.json();
  return data;
};
