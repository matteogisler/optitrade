# OptiTrade - Crypto Trading Dashboard

A clean and modern cryptocurrency trading dashboard built with Next.js 14, TypeScript, and Tailwind CSS. OptiTrade provides a realistic mock trading environment with live market data and visual tools.

<img src="https://images.pexels.com/photos/6771985/pexels-photo-6771985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="drawing" align="center" width="400"/>

## Features

- 📊 **Live Market Data**: Real-time cryptocurrency prices and market statistics updated every minute
- 📈 **Visual Analytics**: Interactive charts and performance metrics
- 🌓 **Dark Mode**: Elegant light and dark theme support
- 📱 **Responsive Design**: Optimized for all screen sizes

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [SWR](https://swr.vercel.app/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API**: [CoinGecko](https://www.coingecko.com/en/api)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/matteogisler/optitrade.git
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                  # Next.js app directory
│   ├── dashboard/       # Dashboard page
│   ├── market/         # Market overview page
│   ├── profile/        # User profile page
│   └── layout.tsx      # Root layout
├── components/          # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Feature-specific components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and types
└── providers/          # React context providers
```

## Features in Detail

### Dashboard

- Market overview with top cryptocurrencies
- Interactive price charts
- Mock trading panel for buy/sell operations
- Real-time price updates

### Market Page

- Comprehensive list of cryptocurrencies
- Advanced sorting and filtering
- Detailed market statistics
- Price change indicators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- Data provided by [CoinGecko API](https://www.coingecko.com/en/api)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)