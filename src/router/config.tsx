import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Rooms from "../pages/rooms/page";
import RoomDetail from "../pages/room-detail/page";
import Contact from "../pages/contact/page";
import Journey from "../pages/journey/page";
import StayGuide from "../pages/stay-guide/page";
import AdminBookings from "../pages/admin/bookings/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rooms",
    element: <Rooms />,
  },
  {
    path: "/room/:id",
    element: <RoomDetail />,
  },
  {
    path: "/stay-guide",
    element: <StayGuide />,
  },
  {
    path: "/admin/bookings",
    element: <AdminBookings />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/journey",
    element: <Journey />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;