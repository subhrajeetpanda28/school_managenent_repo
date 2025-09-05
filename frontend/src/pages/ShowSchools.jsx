import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Navbar";
import "../styles/ShowSchools.css";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/schools");
        setSchools(response.data); // assumes backend returns an array of schools
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch schools. Please try again.");
        setLoading(false);
      }
    };

    fetchSchools();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="schools-container">
        <h2>Schools List</h2>

        {loading && <p>Loading schools...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="schools-grid">
          {!loading && schools.length === 0 && <p>No schools found.</p>}

          {schools.map((school) => (
            <div className="school-card" key={school.id}>
              <img
                src={`http://localhost:5000/schoolImages/${school.image}`}
                alt={school.name}
              />
              <div className="school-info">
                <h3>{school.name}</h3>
                <p>{school.address}</p>
                <p>{school.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
