import { Route, Routes } from 'react-router-dom';
import { routes } from './router';
import PrivateRoute from './PrivateRoute';
import RoleBasedRoute from './RoleBasedRoute';

const renderRoutes = (routes) => {
    return routes.map((route, index) => {
        if (route.children) {
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={route.private ? (
                        <PrivateRoute>{route.element}</PrivateRoute>
                    ) : route.role ? (
                        <RoleBasedRoute role={route.role}>{route.element}</RoleBasedRoute>
                    ) : (
                        route.element
                    )}
                >
                    {renderRoutes(route.children)}
                </Route>
            );
        } else {
            return (
                <Route
                    key={index}
                    path={route.path}
                    element={route.private ? (
                        <PrivateRoute>{route.element}</PrivateRoute>
                    ) : route.role ? (
                        <RoleBasedRoute role={route.role}>{route.element}</RoleBasedRoute>
                    ) : (
                        route.element
                    )}
                />
            );
        }
    });
};

export const AppRouter = () => {
    return (
        <Routes>
            {renderRoutes(routes)}
        </Routes>
    );
};
