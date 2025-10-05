import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
import { HomePage } from './pages/HomePage';
import { SessionPage } from './pages/SessionPage';

const rootRoute = createRootRoute({
  component: () => (
    <div id="app">
      <Outlet />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const sessionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/session/$sessionId',
  component: SessionPage,
});

const routeTree = rootRoute.addChildren([indexRoute, sessionRoute]);

export { routeTree };
