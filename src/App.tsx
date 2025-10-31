// We are using npm packages, so we can import directly
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- IMPORTS ---
// FIXED: Using standard, extension-less imports.
// Your Vite build tool will find the .tsx files automatically.
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Packages from './pages/Packages';
import Enquiry from './pages/Enquiry'; 
import About from './pages/About'; 
import PackageDetail from './pages/PackageDetail'; 
import Footer from './components/Footer';

// --- App Component ---

function App() {
  return (
    <BrowserRouter>
      {/* Navbar appears on every page */}
      <Navbar />
      
      {/* The main content area */}
      <main className="min-h-screen"> {/* min-h-screen ensures footer is pushed down */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/packages" element={<Packages />} />
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

