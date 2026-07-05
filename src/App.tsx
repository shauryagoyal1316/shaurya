import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { LoadingFallback } from "@/components/ui/LoadingFallback";
import { PageTransition } from "@/components/ui/PageTransition";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { lazyWithRetry } from "@/lib/lazyWithRetry";

// lazyWithRetry (not bare lazy): after a redeploy, a cached index.html
// points at chunk files that no longer exist; this reloads once to fetch
// the fresh manifest instead of stranding the visitor on the error screen.
const Home = lazyWithRetry(() => import("./pages/Home"));
const Services = lazyWithRetry(() => import("./pages/Services"));
const About = lazyWithRetry(() => import("./pages/About"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        {/* Legacy redirects — work/project pages removed until client permissions exist */}
        <Route path="/work" element={<Navigate to="/" replace />} />
        <Route path="/work/:slug" element={<Navigate to="/" replace />} />
        <Route path="/portfolio" element={<Navigate to="/" replace />} />
        <Route path="/project/:slug" element={<Navigate to="/" replace />} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <ScrollToTop />
          <SkipToContent />
          <Layout>
            <Suspense fallback={<LoadingFallback />}>
              <AnimatedRoutes />
            </Suspense>
          </Layout>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
