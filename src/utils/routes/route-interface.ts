import { UserRole } from "./user-role";
import { FunctionComponent, PropsWithChildren } from "react";

export interface RouteInterface {
    route: (...args: string[]) => string;
    layout?: () => Promise<FunctionComponent>;
    page?: () => Promise<FunctionComponent<PropsWithChildren>>;
    requiresAuth?: boolean;
    allowedRoles?: UserRole[];
}