export const fetchAnimeByCategoryData = async (category) => {
  const categoryMap = {
    "Season Now": "season-now",
    "Top Anime": "top-anime",
    "Top Manga": "top-manga",
    "Top Characters": "top-characters",
  };

  const mappedCategory = categoryMap[category];
  if (!mappedCategory) {
    throw new Error("Invalid category");
  }

  const response = await fetch(`/api/anime/category/${mappedCategory}`);
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || "Failed to fetch category data");
  }

  const data = await response.json();
  return data;
};
