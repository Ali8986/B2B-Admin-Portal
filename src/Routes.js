import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import DashboardLayout from "./Layouts/Dashboard/DashboardLayout";
import HomePage from "./Pages/Dashboard/dashBoard";
import ErrorPage from "./Components/404";
import EditProfile from "./Components/AppHeader/EditProfile";
import ProtectedRoute from "./Components/GeneralComponents/ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      exact: true,
      element: <LoginPage />,
    },
    {
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: "/dashboard", index: true, element: <HomePage /> },
        { path: "/edit-profile", exact: true, element: <EditProfile /> },
      ],
    },

    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
