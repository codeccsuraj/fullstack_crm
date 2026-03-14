import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageLoader from './components/loader/PageLoader';


const HomePage = React.lazy(() => import("./shared/home/HomePage"))
const Login = React.lazy(() => import("./features/auth/Login"))
const Register = React.lazy(() => import("./features/auth/Register"))

const AppRoutes = () => {
    const router = createBrowserRouter([
        {
            path: '',
            element: (
                <Suspense fallback={<PageLoader />}>
                    <HomePage />
                </Suspense>
            )
        },
        {
            path: '/login',
            element: (
                <Suspense fallback={<PageLoader />}>
                    <Login />
                </Suspense>
            )
        },
        {
            path: '/register',
            element: (
                <Suspense fallback={<PageLoader />}>
                    <Register />
                </Suspense>
            )
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes