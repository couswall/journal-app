import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { AuthRoutes, childAuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth, ErrorPage } from "../ui/components";
import { JournalPage } from "../journal/pages/JournalPage";
import { childJournalRoutes } from "../journal/routes/JournalRoutes";
import { useCheckAuth } from "../hooks";
import { ScrollToTop } from "./ScrollToTop";

export const AppRouter = () => {
  const { status } = useCheckAuth();

  // if (status === "checking") {
  //   return <CheckingAuth />;
  // }

  const routesConfig =
    status === "authenticated"
      ? createBrowserRouter([
          {
            element: <ScrollToTop />,
            children: [
              {
                path: "/",
                element: <JournalPage />,
                children: childJournalRoutes,
                errorElement: <ErrorPage />,
              },
              {
                path: "/*",
                element: <Navigate to={"/"} />,
              },
            ],
          },
        ])
      : createBrowserRouter([
          {
            element: <ScrollToTop />,
            children: [
              {
                path: "/auth/*",
                element: <AuthRoutes />,
                children: childAuthRoutes,
                errorElement: <ErrorPage />,
              },
              {
                path: "/*",
                element: <Navigate to={"auth/login"} />,
              },
            ],
          },
        ]);

  return <RouterProvider router={routesConfig} />;
};
