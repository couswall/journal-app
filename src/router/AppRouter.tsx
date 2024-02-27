import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { AuthRoutes, childAuthRoutes } from "../auth/routes/AuthRoutes";
import { CheckingAuth, ErrorPage } from "../ui/components";
import { JournalPage } from "../journal/pages/JournalPage";
import { childJournalRoutes } from "../journal/routes/JournalRoutes";
import { useSelector } from "react-redux";
import { RootState } from "../store";


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
  
  const { status } = useSelector( (state: RootState) => state.auth )
  
  if ( status === 'checking') {
    return <CheckingAuth/>
  }
  return (
    <RouterProvider router={ routesConfig }/>
  )
}
