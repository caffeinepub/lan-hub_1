import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import NetworkStatus from './pages/NetworkStatus';
import Settings from './pages/Settings';
import Files from './pages/Files';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const networkStatusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/network-status',
  component: NetworkStatus,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/settings',
  component: Settings,
});

const filesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/files',
  component: Files,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  dashboardRoute,
  networkStatusRoute,
  settingsRoute,
  filesRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
