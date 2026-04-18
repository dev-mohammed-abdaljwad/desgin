import { createBrowserRouter } from "react-router";
import { RootLayout } from "./components/layout/RootLayout";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { PodcastStudio } from "./pages/PodcastStudio";
import { EducationalPlatform } from "./pages/EducationalPlatform";
import { Offers } from "./pages/Offers";
import { Portfolio } from "./pages/Portfolio";
import { Blog } from "./pages/Blog";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { NotFound } from "./pages/NotFound";
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { ServicesManagement } from "./pages/admin/ServicesManagement";
import { BookingsManagement } from "./pages/admin/BookingsManagement";
import { PortfolioManagement } from "./pages/admin/PortfolioManagement";
import { BlogManagement } from "./pages/admin/BlogManagement";
import { OffersManagement } from "./pages/admin/OffersManagement";
import { EducationManagement } from "./pages/admin/EducationManagement";
import { LeadsManagement } from "./pages/admin/LeadsManagement";
import { Settings } from "./pages/admin/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "services/:id", Component: ServiceDetail },
      { path: "podcast-studio", Component: PodcastStudio },
      { path: "educational-platform", Component: EducationalPlatform },
      { path: "offers", Component: Offers },
      { path: "portfolio", Component: Portfolio },
      { path: "blog", Component: Blog },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: AdminDashboard },
      { path: "services", Component: ServicesManagement },
      { path: "bookings", Component: BookingsManagement },
      { path: "portfolio", Component: PortfolioManagement },
      { path: "blog", Component: BlogManagement },
      { path: "offers", Component: OffersManagement },
      { path: "education", Component: EducationManagement },
      { path: "leads", Component: LeadsManagement },
      { path: "settings", Component: Settings },
    ],
  },
]);