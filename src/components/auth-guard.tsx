import { PropsWithChildren, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUser } from "../services/hooks";

interface AuthGuardProps {
    route: string;
}


export function AuthGuard({
    children,
    route
}: PropsWithChildren<AuthGuardProps>) {
    const currentUser = useCurrentUser();

    useEffect(() => undefined, [currentUser])
    
    if (!currentUser && route !== '/login') {
        return <Navigate to={"/login"} replace={true} />;
    }
    if (currentUser && route === '/login') {
        return <Navigate to={"/"} replace={true} />;
    }

    return <>{children}</>;
}
