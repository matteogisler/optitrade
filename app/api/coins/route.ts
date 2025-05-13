export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const COINGECKO = 'https://api.coingecko.com/api/v3'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const count = searchParams.get('count') ?? '10'
  const page  = searchParams.get('page')  ?? '1'

  const url = `${COINGECKO}/coins/markets?vs_currency=usd` +
              `&order=market_cap_desc&per_page=${count}&page=${page}` +
              `&sparkline=true&price_change_percentage=24h,7d`

  const geoRes = await fetch(url)
  if (!geoRes.ok) {
    return NextResponse.json({ error: 'CoinGecko error' }, { status: geoRes.status })
  }
  const data = await geoRes.json()

  return NextResponse.json(data, {
    status: 200,
    // cache on the edge for 30s, allow stale for 60s
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' }
  })
}
