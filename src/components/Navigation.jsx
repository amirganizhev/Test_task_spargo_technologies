import React from "react";
import PostsPage from '../pages/PostsPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PostIdPage from "../pages/PostIdPage";
import ErrorPage from "../pages/ErrorPage";

function Navigation(props) {

  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/posts/:id" element={<PostIdPage />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Navigation;
