import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Toaster } from 'react-hot-toast';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Calendar from './components/Calendar/Calendar';
import Dashboard from './components/Dashboard';
import AppLayout from './components/ui/AppLayout';
import { ThemeProvider } from './context/themeProvider';

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
        path: "/user",
        element: <h1>Welcome, %NAME%</h1>,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
              backgroundColor: "var(--color-primary-base)",
              color: "var(--color-text-base)",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
