import { StrictMode } from "react";
import Routes from "@/router/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./components/theme-provider";
import "./global.css";
import "./global.custom.css";
import { Toaster } from "sonner";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Routes />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Toaster richColors closeButton expand />
    </ThemeProvider>
  </StrictMode>,
);
