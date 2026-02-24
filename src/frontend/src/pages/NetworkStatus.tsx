import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Activity, Wifi, Signal, Globe, Router } from 'lucide-react';

export default function NetworkStatus() {
  const networkMetrics = [
    { label: 'Download Speed', value: '847 Mbps', progress: 85, icon: Activity },
    { label: 'Upload Speed', value: '423 Mbps', progress: 70, icon: Activity },
    { label: 'Signal Strength', value: 'Excellent', progress: 95, icon: Signal },
    { label: 'Latency', value: '2ms', progress: 98, icon: Wifi },
  ];

  const connectedDevices = [
    { name: 'Desktop-01', ip: '192.168.1.10', mac: 'AA:BB:CC:DD:EE:01', status: 'active' },
    { name: 'Laptop-03', ip: '192.168.1.15', mac: 'AA:BB:CC:DD:EE:02', status: 'active' },
    { name: 'Server-Main', ip: '192.168.1.5', mac: 'AA:BB:CC:DD:EE:03', status: 'active' },
    { name: 'Printer-02', ip: '192.168.1.20', mac: 'AA:BB:CC:DD:EE:04', status: 'active' },
    { name: 'Mobile-05', ip: '192.168.1.25', mac: 'AA:BB:CC:DD:EE:05', status: 'idle' },
  ];

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Network Status</h1>
        <p className="text-muted-foreground">
          Real-time monitoring of your local network performance
        </p>
      </div>

      {/* Network Health */}
      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Router className="h-5 w-5" />
                Network Health
              </CardTitle>
              <CardDescription>Overall network performance metrics</CardDescription>
            </div>
            <Badge variant="default" className="bg-primary/10 text-primary hover:bg-primary/20">
              All Systems Operational
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {networkMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <Progress value={metric.progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Connected Devices */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Connected Devices
          </CardTitle>
          <CardDescription>
            {connectedDevices.length} devices currently on the network
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {connectedDevices.map((device, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border border-border/50 p-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Wifi className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{device.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.ip} • {device.mac}
                      </p>
                    </div>
                  </div>
                </div>
                <Badge
                  variant={device.status === 'active' ? 'default' : 'secondary'}
                  className={
                    device.status === 'active'
                      ? 'bg-primary/10 text-primary hover:bg-primary/20'
                      : ''
                  }
                >
                  {device.status === 'active' ? 'Active' : 'Idle'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
