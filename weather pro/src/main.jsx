import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "../src/components/Sidebar";
import About from "../src/components/About";
import PlaceDetail from '../routes/DetailView';
import NotFound from '../routes/NotFound';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="app-grid">
        <div>
          <Sidebar />
        </div>
        <div>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="weatherDetails/:city" element={<PlaceDetail />} /> 
            <Route path="about" element={<About />} />  
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
)