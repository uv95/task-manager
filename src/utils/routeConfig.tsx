import { RouteProps } from 'react-router-dom';
import { NotFound } from '../pages/NotFound';
import { Projects } from '../pages/Projects';
import { Tasks } from '../pages/Tasks';

export enum AppRoutes {
  PROJECTS = 'projects',
  TASKS = 'tasks',
  NOT_FOUND='not_found'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.PROJECTS]: '/',
    [AppRoutes.TASKS]: '/:id',
    [AppRoutes.NOT_FOUND]: '*',
};

export const routeConfig: Record<AppRoutes, RouteProps> = {
    [AppRoutes.PROJECTS]: {
        path: RoutePath.projects,
        element: <Projects/>,
    },
    [AppRoutes.TASKS]: {
        path: RoutePath.tasks,
        element: <Tasks/>,
    },
    [AppRoutes.NOT_FOUND]: {
        path: RoutePath.not_found,
        element: <NotFound />,
    },
};
