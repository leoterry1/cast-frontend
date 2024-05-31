/* eslint-disable react-refresh/only-export-components */
import { RouteInterface } from "./utils/routes/route-interface.ts";

export const AppRoutes = {
    login: {
        route: () => "/login",
        page: async () => (await import('./pages/login-page.tsx')).Login,
    },
    home: {
        route: () => '/',
        page: async () => (await import('./pages/home-page.tsx')).HomePage,
        layout: true
    }
} as const satisfies Record<string, RouteInterface>;
export type Routes = keyof typeof AppRoutes;

export const routeList: RouteInterface[] = Object.values(AppRoutes);
