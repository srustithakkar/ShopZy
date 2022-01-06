import React from 'react';
import './App.css';
import Index from "./components/Index";
import Cart from "./components/Cart"
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App () {
    return (
        <div className="h-100">
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/cart" element={<Cart />} />
                {/* <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contactus" element={<ContactUs />} />
                <Route path="/faq" element={<Faq />} />
                <Route path="/login" element={<Login />} />
                <Route path="/policy" element={<Policy />} />
                <Route path="/register" element={<Register />} /> */}
            </Routes>
        </div>
    );
}

export default App