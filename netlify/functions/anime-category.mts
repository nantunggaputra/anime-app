import type { Config } from '@netlify/functions'
import { fetchFromJikan } from './utils/jikanProxy.mts'

export default async (req: Request, context: any) => {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const category = context.params.category

  if (!category) {
    return new Response(JSON.stringify({ error: 'Missing category parameter' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const categoryEndpoints: Record<string, string> = {
    'season-now': '/seasons/now?limit=25',
    'top-anime': '/top/anime?limit=25',
    'top-manga': '/top/manga?limit=25',
    'top-characters': '/top/characters?limit=25',
  }

  const endpoint = categoryEndpoints[category]

  if (!endpoint) {
    return new Response(JSON.stringify({ error: 'Invalid category' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  try {
    const data = await fetchFromJikan(endpoint)
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch category data'
    const status = (error as any).status || 500

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export const config: Config = {
  path: '/api/anime/category/:category',
}
