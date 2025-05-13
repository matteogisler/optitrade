import Link from 'next/link';
import { ArrowRight, Wallet, TrendingUp, LineChart, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col min-h-100vh">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Your clean mock{' '}
            <span className="bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
              trading dashboard
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience crypto trading without the risk. OptiTrade provides a realistic trading environment with live market data and visual tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg" className="font-semibold">
              <Link href="/dashboard">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-semibold">
              <Link href="/market">
                View Market
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              OptiTrade delivers a comprehensive trading experience with tools designed for both beginners and advanced users.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Live Market Data</h3>
              <p className="text-muted-foreground">
                Real-time cryptocurrency prices and market statistics updated every minute.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Analytics</h3>
              <p className="text-muted-foreground">
                Interactive charts and performance metrics to track market trends and movements.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Wallet className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mock Trading</h3>
              <p className="text-muted-foreground">
                Practice buying and selling cryptocurrencies with our simulated trading environment.
              </p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-sm border hover:shadow-md transition-all">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk-Free</h3>
              <p className="text-muted-foreground">
                Learn and experiment with trading strategies without risking real money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 bg-secondary/50 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to start trading?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Jump into the world of cryptocurrency trading with our intuitive dashboard and real-time market data.
          </p>
          <Button asChild size="lg">
            <Link href="/dashboard">
              Launch Dashboard <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}