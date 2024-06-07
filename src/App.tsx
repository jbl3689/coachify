import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import Calendar from "./features/calendar/Calendar";
import AppLayout from "./ui/AppLayout";
import CreateEvent from "./features/event/CreateEvent";
import Dashboard from "./features/dashboard/Dashboard";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

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
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />

      <DndProvider backend={HTML5Backend}>
        <RouterProvider router={router}></RouterProvider>
      </DndProvider>

      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "var(--color-primary)",
            color: "var(--color-backgroundDark)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
