export const dynamic = 'force-dynamic'
import { NextRequest, NextResponse } from 'next/server'

const COINGECKO = 'https://api.coingecko.com/api/v3'

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params
  const url = `${COINGECKO}/coins/${id}` +
              `?localization=false&tickers=false&market_data=true` +
              `&community_data=false&developer_data=false`

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
