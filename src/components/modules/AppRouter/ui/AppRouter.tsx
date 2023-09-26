import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../../../../utils/routeConfig';


export const AppRouter = () => (
    <Suspense fallback={<p>Loading...</p>}>
        <Routes>
            {Object.values(routeConfig).map(({ element, path }) => (
                <Route
                    key={path}
                    element={<div className="page-wrapper">{element}</div>}
                    path={path}
                />
            ))}
        </Routes>
    </Suspense>
);

