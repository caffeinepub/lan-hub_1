import { Network, Wifi, Shield, Zap } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: Network,
      title: 'Local Network',
      description: 'Running securely on your private LAN infrastructure',
    },
    {
      icon: Wifi,
      title: 'Fast Access',
      description: 'Lightning-fast response times with local connectivity',
    },
    {
      icon: Shield,
      title: 'Secure',
      description: 'Isolated from external networks for maximum security',
    },
    {
      icon: Zap,
      title: 'Always Available',
      description: 'No internet required - works offline on your network',
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/40">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(/assets/generated/hero-network.dim_1920x400.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="container relative py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Connected to Local Network
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Welcome to Your{' '}
              <span className="text-primary">LAN Hub</span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Your centralized dashboard for managing and monitoring your local area network. 
              Fast, secure, and always accessible on your private network.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button size="lg" className="gap-2">
                  <LayoutDashboard className="h-5 w-5" />
                  Go to Dashboard
                </Button>
              </Link>
              <Link to="/network-status">
                <Button size="lg" variant="outline" className="gap-2">
                  <Activity className="h-5 w-5" />
                  Check Network Status
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              Local Network Features
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage your LAN infrastructure
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-border/50">
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Status Section */}
      <section className="border-t border-border/40 bg-muted/30">
        <div className="container py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-3 rounded-lg border border-primary/20 bg-card px-6 py-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Network className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-muted-foreground">Network Status</p>
                <p className="text-lg font-semibold text-foreground">Connected & Operational</p>
              </div>
            </div>
            <p className="text-muted-foreground">
              Your LAN Hub is running smoothly on your local network. 
              All services are operational and ready to use.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function LayoutDashboard({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="7" height="9" x="3" y="3" rx="1" />
      <rect width="7" height="5" x="14" y="3" rx="1" />
      <rect width="7" height="9" x="14" y="12" rx="1" />
      <rect width="7" height="5" x="3" y="16" rx="1" />
    </svg>
  );
}

function Activity({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
