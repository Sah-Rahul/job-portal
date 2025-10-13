import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { Toaster } from "react-hot-toast";
import Hero from "./pages/Hero";
import Jobs from "./pages/Jobs";
import BrowseJob from "./pages/BrowseJob";
import Profile from "./pages/Profile";
import MyApplication from "./pages/MyApplication";
import JobDescription from "./pages/JobDescription";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/job-browse" element={<BrowseJob />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/my-applications" element={<MyApplication />} />
          <Route path="/job/description/:id" element={<JobDescription />} />
          {/* 404 page  */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
