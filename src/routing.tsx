import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import MyReviews from "./pages/MyReviews";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: "/myreviews",
                element: (
                    <ProtectedRoute>
                        <MyReviews />
                    </ProtectedRoute>
                )
            },
            {
                path: "/login",
                element: <LoginPage />
            },
            {
                path: "/register",
                element: <RegisterPage/>
            }
        ]
    }
])

export default router;