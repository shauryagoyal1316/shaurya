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
import { lazy, Suspense } from "react";

// Code-split route components. ProjectDetail is intentionally eager — when
// it was lazy, the chunk fetch + page-transition curtain stacked into a
// noticeable blank flash on slow connections.
import ProjectDetail from "./pages/ProjectDetail";
const Home = lazy(() => import("./pages/Home"));
const Work = lazy(() => import("./pages/Portfolio"));
const Services = lazy(() => import("./pages/Services"));
const About = lazy(() => import("./pages/About"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/work" element={<PageTransition><Work /></PageTransition>} />
        <Route path="/services" element={<PageTransition><Services /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/work/:slug" element={<PageTransition><ProjectDetail /></PageTransition>} />
        {/* Legacy redirects */}
        <Route path="/portfolio" element={<Navigate to="/work" replace />} />
        <Route path="/project/:slug" element={<Navigate to="/work" replace />} />
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
