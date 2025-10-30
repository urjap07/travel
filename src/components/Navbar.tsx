import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const { pathname } = useLocation();

  // Helper to style the active and hovered links
  const linkClass = (path: string) =>
    "py-2 px-4 rounded-xl transition font-medium transform " +
    (pathname === path
      ? "bg-[#FF7A59] text-white shadow" // Coral for active
      : [
          "text-[#1A1A1A] border border-transparent",
          "hover:text-white hover:shadow-md hover:-translate-y-0.5",
          "hover:bg-gradient-to-r hover:from-[#FF7A59] hover:via-[#F4C542] hover:to-[#00AFAA]",
        ].join(" "));

  return (
    <nav className="bg-gradient-to-r from-[#F8FDFD] via-[#E0F7FA] to-[#B2EBF2] shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      <div className="font-heading text-2xl font-extrabold tracking-tight flex items-center gap-1">
        <Link to="/" className="flex items-center gap-1">
          <span className="bg-gradient-to-r from-[#FF7A59] via-[#F4C542] to-[#00AFAA] text-transparent bg-clip-text">The Travel</span>
          <span className="text-[#00AFAA]">Group</span>
        </Link>
      </div>
      <div className="flex space-x-2">
        <Link to="/" className={linkClass("/")}>Home</Link>
        <Link to="/packages" className={linkClass("/packages")}>Packages</Link>
        <Link to="/enquiry" className={linkClass("/enquiry")}>Enquiry</Link>
        <Link to="/about" className={linkClass("/about")}>About</Link>
      </div>
    </nav>
  );
}