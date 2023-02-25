import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Demo from '../demo/Demo';
import Layout from './Layout';

const Router = () => {
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Demo />} />
          <Route path="/demo" element={<Demo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router