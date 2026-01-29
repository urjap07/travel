// We are using npm packages, so we can import directly
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- IMPORTS ---
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import GroupPackages from './pages/GroupPackages'; 
import Enquiry from './pages/Enquiry'; 
import About from './pages/About'; 
import PackageDetail from './pages/PackageDetail'; 
import Gallery from './pages/Gallery'; // ✅ NEW IMPORT
import Footer from './components/Footer';

// --- App Component ---

function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />
      
      {/* The main content area */}
      <main className="min-h-screen"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
          
          {/* Route for Group/Family Packages */}
          <Route path="/group-packages" element={<GroupPackages />} />
          
          {/* ✅ NEW ROUTE for Gallery */}
          <Route path="/gallery" element={<Gallery />} />
          
          <Route path="/package/:id" element={<PackageDetail />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      
      {/* Footer appears on every page */}
      <Footer />
      
    </BrowserRouter>
  );
}

export default App;