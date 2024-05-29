import {
    FunctionComponent,
    useEffect,
    useState,
} from "react";
import { RouteInterface } from "./route-interface";
import { AuthGuard } from "../../components/auth-guard";

interface Props {
    route: RouteInterface;
}

export function ComponentLoader({ route }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [Page, setPage] = useState<FunctionComponent>();
    useEffect(() => {
        if (route.page) {
            route
                .page()
                .then((page) => {
                    setPage(() => page);
                })
                .then(() => {
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }, [route]);

    if (isLoading) {
        return undefined;
    }

    if(Page) return (
        <AuthGuard route={route.route()}>
            <Page/>
        </AuthGuard>
    )
    return <div>Page not defined in route</div>;
}
