import { Link, useRouterState } from '@tanstack/react-router';
import { Network, LayoutDashboard, Activity, Settings } from 'lucide-react';

export default function Navigation() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: Network },
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/network-status', label: 'Network Status', icon: Activity },
    { path: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src="/assets/generated/network-icon.dim_128x128.png" 
            alt="LAN Hub" 
            className="h-10 w-10 rounded-lg"
          />
          <span className="text-xl font-bold tracking-tight text-foreground">
            LAN Hub
          </span>
        </div>
        
        <ul className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent/50 hover:text-foreground'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
