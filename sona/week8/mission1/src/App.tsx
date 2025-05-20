import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const client = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <div className=" bg-black min-h-screen  overflow-y-auto text-white ">
          <RouterProvider
            router={router}
            future={{ v7_startTransition: true }}
          />
        </div>
      </AuthProvider>
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
