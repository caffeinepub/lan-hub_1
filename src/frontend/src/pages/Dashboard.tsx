import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, HardDrive, Wifi, Clock, TrendingUp, Server } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: 'Connected Devices',
      value: '12',
      change: '+2 from yesterday',
      icon: Users,
      trend: 'up',
    },
    {
      title: 'Network Bandwidth',
      value: '847 Mbps',
      change: 'Average speed',
      icon: TrendingUp,
      trend: 'neutral',
    },
    {
      title: 'Storage Used',
      value: '2.4 TB',
      change: '68% of total',
      icon: HardDrive,
      trend: 'neutral',
    },
    {
      title: 'Uptime',
      value: '99.8%',
      change: 'Last 30 days',
      icon: Clock,
      trend: 'up',
    },
  ];

  const recentActivity = [
    { device: 'Desktop-01', action: 'Connected', time: '2 minutes ago', status: 'success' },
    { device: 'Laptop-03', action: 'Disconnected', time: '15 minutes ago', status: 'neutral' },
    { device: 'Server-Main', action: 'Updated', time: '1 hour ago', status: 'success' },
    { device: 'Printer-02', action: 'Connected', time: '3 hours ago', status: 'success' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor your local network performance and connected devices
        </p>
      </div>

      {/* Stats Grid */}
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Network Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi className="h-5 w-5" />
              Network Overview
            </CardTitle>
            <CardDescription>Current network configuration and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Network Name</span>
              <span className="text-sm text-muted-foreground">LAN-Network-01</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">IP Range</span>
              <span className="text-sm text-muted-foreground">192.168.1.0/24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Gateway</span>
              <span className="text-sm text-muted-foreground">192.168.1.1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">DNS Server</span>
              <span className="text-sm text-muted-foreground">192.168.1.1</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest device connections and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.device}</p>
                    <p className="text-xs text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
