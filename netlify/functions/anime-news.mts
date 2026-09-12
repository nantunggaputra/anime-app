import type { Config } from '@netlify/functions'
import { fetchFromJikan } from './utils/jikanProxy.mts'

export default async (req: Request) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const url = new URL(req.url)
  const animeId = url.searchParams.get('animeId')

  if (!animeId) {
    return new Response(JSON.stringify({ error: 'Missing animeId parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await fetchFromJikan(`/anime/${animeId}/news`)
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch anime news'
    const status = (error as any).status || 500

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config: Config = {
  path: '/api/anime/news',
}
