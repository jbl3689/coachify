import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Calendar from "./features/calendar/Calendar";
import AppLayout from "./ui/AppLayout";
import CreateEvent from "./features/event/CreateEvent";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <h1>Welcome to Coachify</h1>,
      },
      {
        path: "/calendar",
        element: <Calendar />,
      },
      {
        path: "/event/create?",
        element: <CreateEvent />,
      },
      {
        path: "/user",
        element: <h1>Welcome, %NAME%</h1>,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
