const JIKAN_API_BASE_URL = "https://api.jikan.moe/v4";
const REQUEST_TIMEOUT = 30000;
const MAX_RETRIES = 2;

export async function fetchFromJikan(endpoint: string): Promise<any> {
  const url = `${JIKAN_API_BASE_URL}${endpoint}`;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

      const response = await fetch(url, {
        signal: controller.signal,
        headers: {
          "Accept": "application/json",
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = "Failed to fetch data";

        switch (response.status) {
          case 400:
            errorMessage = "Invalid request to Jikan API";
            break;
          case 404:
            errorMessage = "Anime not found";
            break;
          case 405:
            errorMessage = "Method not allowed by Jikan API";
            break;
          case 429:
            errorMessage = "Rate limited by Jikan API. Please try again in a moment.";
            if (attempt < MAX_RETRIES) {
              const delay = Math.pow(2, attempt) * 1000;
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            }
            break;
          case 500:
            errorMessage = "Jikan API server error. Please try again later.";
            if (attempt < MAX_RETRIES) {
              const delay = Math.pow(2, attempt) * 1000;
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            }
            break;
          case 503:
            errorMessage = "Jikan API is under maintenance. Please try again later.";
            if (attempt < MAX_RETRIES) {
              const delay = Math.pow(2, attempt) * 1000;
              await new Promise(resolve => setTimeout(resolve, delay));
              continue;
            }
            break;
          default:
            errorMessage = `API error: ${response.status} ${response.statusText}`;
        }

        const error = new Error(errorMessage);
        (error as any).status = response.status;
        throw error;
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      lastError = error as Error;

      if (error instanceof TypeError && error.name === "AbortError") {
        lastError = new Error("Request timeout. The API took too long to respond.");
        if (attempt < MAX_RETRIES) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      } else if ((error as any).status === 429 || (error as any).status === 500 || (error as any).status === 503) {
        if (attempt < MAX_RETRIES) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          continue;
        }
      }

      throw error;
    }
  }

  throw lastError || new Error("Failed to fetch data after retries");
}
