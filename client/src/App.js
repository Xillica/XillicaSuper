import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter
import "./App.css";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Explore from "./components/Explore/Explore";
import AddProductForm from "./components/AddProduct/AddProduct";
import AddProductInfoForm from "./components/AddProductDetails/AddProductDetails";
import ExploreProduct from "./components/Explore/ExploreProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route exact path="/explore" element={<Explore />} />
          <Route path="/addProduct" element={<AddProductForm />} />
          <Route path="/addProductDetails" element={<AddProductInfoForm />} />
          <Route path="/explore/:id" element={<ExploreProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
