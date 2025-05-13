export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const COINGECKO = 'https://api.coingecko.com/api/v3'

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const coinId = searchParams.get('coinId')
  const days   = searchParams.get('days')   ?? '7'

  if (!coinId) {
    return NextResponse.json({ error: 'coinId is required' }, { status: 400 })
  }

  const url = `${COINGECKO}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`
  const geoRes = await fetch(url)
  if (!geoRes.ok) {
    return NextResponse.json({ error: 'CoinGecko error' }, { status: geoRes.status })
  }
  const data = await geoRes.json()

  return NextResponse.json(data, {
    status: 200,
    headers: { 'Cache-Control': 's-maxage=30, stale-while-revalidate=60' }
  })
}
