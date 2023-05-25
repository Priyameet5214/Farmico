import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
const RetailerLogin = React.lazy(() => import("pages/RetailerLogin"));
const TransporterLogin = React.lazy(() => import("pages/TransporterLogin"));
const FarmerLogin = React.lazy(() => import("pages/FarmerLogin"));
const TrackPage = React.lazy(() => import("pages/TrackPage"));
const RegisterPage = React.lazy(() => import("pages/RegisterPage"));
const WelcomePage = React.lazy(() => import("pages/WelcomePage"));
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/registerpage" element={<RegisterPage />} />
          <Route path="/trackpage" element={<TrackPage />} />
          <Route path="/farmerlogin" element={<FarmerLogin />} />
          <Route path="/transporterlogin" element={<TransporterLogin />} />
          <Route path="/retailerlogin" element={<RetailerLogin />} />
          <Route path="/dhiwise-dashboard" element={<Home />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;
