import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import About from "./pages/About";
import Journal from "./pages/Journal";
import Research from "./pages/Research";
import EditorialBoard from "./pages/EditorialBoard";
import Contact from "./pages/Contact";
import SubmitPaper from "./pages/SubmitPaper";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import Reviewer from "./pages/Reviewer";
import UserDashboard from "./pages/UserDashboard";
import PublicationTeam from "./pages/PublicationTeam";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./lib/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/research" element={<Research />} />
          <Route path="/editorial-board" element={<EditorialBoard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/submit" element={<SubmitPaper />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password/*" element={<ForgotPassword />} />
          <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><Navigate to="/admin/dashboard" replace /></ProtectedRoute>} />
          <Route path="/admin/*" element={<ProtectedRoute allowedRoles={["Admin"]}><Admin /></ProtectedRoute>} />
          <Route path="/editor" element={<ProtectedRoute allowedRoles={["Editor"]}><Navigate to="/editor/dashboard" replace /></ProtectedRoute>} />
          <Route path="/editor/*" element={<ProtectedRoute allowedRoles={["Editor"]}><Editor /></ProtectedRoute>} />
          <Route path="/reviewer" element={<ProtectedRoute allowedRoles={["Reviewer"]}><Navigate to="/reviewer/dashboard" replace /></ProtectedRoute>} />
          <Route path="/reviewer/*" element={<ProtectedRoute allowedRoles={["Reviewer"]}><Reviewer /></ProtectedRoute>} />
          <Route path="/user-dashboard" element={<ProtectedRoute allowedRoles={["Author"]}><Navigate to="/user/dashboard" replace /></ProtectedRoute>} />
          <Route path="/user" element={<ProtectedRoute allowedRoles={["Author"]}><Navigate to="/user/dashboard" replace /></ProtectedRoute>} />
          <Route path="/user/*" element={<ProtectedRoute allowedRoles={["Author"]}><UserDashboard /></ProtectedRoute>} />
          <Route path="/publication" element={<ProtectedRoute allowedRoles={["Publication Team"]}><Navigate to="/publication/dashboard" replace /></ProtectedRoute>} />
          <Route path="/publication/*" element={<ProtectedRoute allowedRoles={["Publication Team"]}><PublicationTeam /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
