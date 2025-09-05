import { useState } from "react";
import Navbar from "../Navbar";
import "../styles/AddSchool.css"; // import css

export default function AddSchool() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    email_id: "",
    image: null,
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email_id.includes("@")) newErrors.email_id = "Invalid email";
    if (!formData.contact.match(/^[0-9]{10}$/))
      newErrors.contact = "Contact must be 10 digits";
    if (!formData.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const res = await fetch("http://localhost:5000/api/schools", {
        method: "POST",
        body: data,
      });

      if (res.ok) {
        setMessage("✅ School added successfully!");
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          contact: "",
          email_id: "",
          image: null,
        });
      } else {
        setMessage("❌ Failed to add school");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Error connecting to server");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="form-container">
        <h2>Add School</h2>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleSubmit} className="school-form">
          <label>School Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <p className="error">{errors.name}</p>

          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <label>City</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />

          <label>State</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
          />

          <label>Contact</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
          <p className="error">{errors.contact}</p>

          <label>Email</label>
          <input
            type="email"
            name="email_id"
            value={formData.email_id}
            onChange={handleChange}
          />
          <p className="error">{errors.email_id}</p>

          <label>School Image</label>
          <input type="file" name="image" accept="image/*" onChange={handleChange} />
          <p className="error">{errors.image}</p>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
