import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PageLoader from './components/loader/PageLoader';
import ProtectedRoute from './guard/ProtectedRoute';


const HomePage = React.lazy(() => import("./shared/home/HomePage"))
const Login = React.lazy(() => import("./features/auth/Login"))
const Register = React.lazy(() => import("./features/auth/Register"))
const ForgotPassword = React.lazy(() => import("./features/auth/ForgotPassword"))
const ChangePassword = React.lazy(() => import("./features/auth/ChangePassword"))

const UserLayout = React.lazy(() => import("./shared/user/UserLayout"))
const UserProfile = React.lazy(() => import("./shared/user/UserProfile"))

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
        {
            path: '/forgot-password',
            element: (
                <Suspense fallback={<PageLoader />}>
                    <ForgotPassword />
                </Suspense>
            ),
        },
        {
            path: '/profile',
            element: (
                <ProtectedRoute>
                    <Suspense fallback={<PageLoader />}>
                        <UserLayout />
                    </Suspense>
                </ProtectedRoute>
            ),
             children : [
                {path : '', element : (
                    <Suspense fallback={<PageLoader />}>
                        <UserProfile />
                    </Suspense>
                )},
                {path : 'change-password', element : (
                    <Suspense fallback={<PageLoader />}>
                        <ChangePassword />
                    </Suspense>
                )},
            ]
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default AppRoutes