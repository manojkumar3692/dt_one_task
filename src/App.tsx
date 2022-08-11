import React from 'react';
import { Routes, Route } from "react-router-dom";
import './App.css';
import ProductPage from './page/ProductPage';
import NotFoundPage from './page/NotFoundPage'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
