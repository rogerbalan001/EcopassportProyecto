import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { PackagesPage } from "./pages/PackagesPage";
import { ReservationsPage } from "./pages/ReservationsPage";
import { CommunityPage } from "./pages/CommunityPage";
import { OperatorsPage } from "./pages/OperatorsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { AdminPage } from "./pages/AdminPage";
import { LoginPage } from "./pages/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: LoginPage,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "search", Component: SearchPage },
      { path: "packages", Component: PackagesPage },
      { path: "reservations", Component: ReservationsPage },
      { path: "community", Component: CommunityPage },
      { path: "operators", Component: OperatorsPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "admin", Component: AdminPage },
      { path: "*", Component: () => <div className="text-center py-20"><h1>404 - Página no encontrada</h1></div> },
    ],
  },
]);
