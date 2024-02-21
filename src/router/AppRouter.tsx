import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthRoutes, childAuthRoutes } from "../auth/routes/AuthRoutes";
import { ErrorPage } from "../ui/components";
import { JournalPage } from "../journal/pages/JournalPage";
import { childJournalRoutes } from "../journal/routes/JournalRoutes";


const routesConfig = createBrowserRouter([
    {
        path: "/",
        element: <JournalPage/>,
        children: childJournalRoutes,
        errorElement: <ErrorPage/> 
    }, 
    {
        path: '/auth/*',
        element: <AuthRoutes/>,
        children: childAuthRoutes,
        errorElement: <ErrorPage/>
    },
    {
        path: '/*',
        element: <Navigate to={'/'}/>
    }
]);


export const AppRouter = () => {
  return (
    <RouterProvider router={ routesConfig }/>
  )
}
