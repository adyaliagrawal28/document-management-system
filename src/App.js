import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import Upload from "./pages/Upload/Upload";
import Search from "./pages/Search/Search";
import Preview from "./pages/Preview/Preview";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
          <Route path="/preview/:id" element={<Preview />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
