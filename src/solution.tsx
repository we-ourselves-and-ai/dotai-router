import {atom} from "@dacorm/dotai";

let initialRoutes: any;

export const createRouter = (routes: any, history: any): any => {
    initialRoutes = routes;
    const router: any = atom({});
    router.history = history;
    router.routes = routes;

    let popstate = () => {
        router.set(location.pathname)
    }


    if (typeof window !== 'undefined' && typeof location !== 'undefined') {
        router.set(location.pathname)
        window.addEventListener('popstate', popstate)
        return router;
    } else {
        router.set('/')
    }

    return router;
}

export function getPagePath(router: any, name: any, params: any) {
    const searchValue = (routes: any, value: any) => {
        if (value.includes(':')) {
            const routeParts = value.split(':');
            const matched = routeParts[0];
            return `${matched}${params}`
        }

        for (let key in routes) {
            if (key === value) {
                return routes[key];
            }
        }
        return null;
    };
    let route = searchValue(initialRoutes, name);

    return route || '/'
}

export function openPage(router: any, name: any, params: any) {
    const path = getPagePath(router, name, params);
    router.history.pushState((params && params) || null, '', path)
    router.set(path)
}

export function redirectPage(router: any, name: any, params: any) {
    const path = getPagePath(router, name, params);
    router.history.replaceState(null, '', path)
    router.set(path)
}
