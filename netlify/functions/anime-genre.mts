import type { Config } from '@netlify/functions'
import { fetchFromJikan } from './utils/jikanProxy.mts'

export default async (req: Request, context: any) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const genreId = context.params.genreId

  if (!genreId) {
    return new Response(JSON.stringify({ error: 'Missing genre ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await fetchFromJikan(`/anime?genres=${genreId}&limit=25`)

    // Apply the same filtering logic as the original frontend service
    const filteredAnimes = (Array.isArray(data) ? data : []).filter(
      (anime: any) =>
        (anime.rating !== "R+ - Mild Nudity" &&
          anime.rating !== "R - 17+ (violence & profanity)" &&
          anime.type !== "OVA" &&
          anime.type !== "Movie" &&
          anime.type === "TV") ||
        (anime.rating !== "R+ - Mild Nudity" &&
          anime.rating !== "R - 17+ (violence & profanity)" &&
          anime.type === "OVA" &&
          anime.type !== "Movie")
    )

    return new Response(JSON.stringify(filteredAnimes), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch anime by genre'
    const status = (error as any).status || 500

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config: Config = {
  path: '/api/anime/genre/:genreId',
}
