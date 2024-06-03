import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Calendar from "./features/calendar/Calendar";
import AppLayout from "./ui/AppLayout";
import CreateEvent from "./features/event/CreateEvent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import Dashboard from "./features/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
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
  return (
    <DndProvider backend={HTML5Backend}>
      <RouterProvider router={router}></RouterProvider>
    </DndProvider>
  );
}

export default App;
