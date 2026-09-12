export const fetchAnimeTrailerData = async (id) => {
  if (!id) {
    throw new Error("Anime ID is required");
  }

  const response = await fetch(`/api/anime/${id}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch anime trailer data");
  }

  const data = await response.json();
  return data;
};
