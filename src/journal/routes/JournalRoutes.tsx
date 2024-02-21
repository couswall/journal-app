import { Outlet } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"

export const childJournalRoutes = [
    {
        path: '/',
        element: <JournalPage/>
    }
]

export const JournalRoutes = () => {
  return (
    <Outlet/>
  )
}
