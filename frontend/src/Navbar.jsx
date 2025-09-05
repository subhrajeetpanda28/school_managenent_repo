import { Link } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav
      style={{
        background: "#0077cc",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}
    >
      <h2 style={{ color: "white" }}>School Management</h2>

      {/* Desktop Links */}
      <div className="nav-links" style={{ display: "none" }}>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/add-school" style={linkStyle}>
          Add School
        </Link>
        <Link to="/show-schools" style={linkStyle}>
          Show Schools
        </Link>
      </div>

      {/* Hamburger Button (visible on mobile) */}
      <button
        onClick={toggleMenu}
        style={{
          background: "transparent",
          border: "none",
          color: "white",
          fontSize: "24px",
          cursor: "pointer",
          display: "block",
        }}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "20px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "6px",
            padding: "10px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          <Link to="/" style={mobileLink} onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/add-school" style={mobileLink} onClick={toggleMenu}>
            Add School
          </Link>
          <Link to="/show-schools" style={mobileLink} onClick={toggleMenu}>
            Show Schools
          </Link>
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  color: "white",
  marginLeft: "15px",
  textDecoration: "none",
  fontWeight: "bold",
};

const mobileLink = {
  display: "block",
  padding: "8px 12px",
  textDecoration: "none",
  color: "#0077cc",
  fontWeight: "bold",
};
