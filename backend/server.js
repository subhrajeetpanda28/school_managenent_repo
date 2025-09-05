require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json()); // for JSON routes

// ---------------- Upload Folder ----------------
const uploadDir = path.join(__dirname, "schoolImages");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

// Serve uploaded images statically
app.use("/schoolImages", express.static(uploadDir));

// ---------------- MySQL Connection ----------------
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // change if needed
  password: process.env.DB_PASSWORD,
  database: "school_db",
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Error:", err);
    process.exit(1);
  }
  console.log("✅ MySQL Connected...");
});

// ---------------- Multer Setup ----------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB max
  fileFilter: (req, file, cb) => {
    // accept only images
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) return cb(null, true);
    cb(new Error("Only images are allowed"));
  },
});

// ---------------- Routes ----------------

// Add a school (POST)
app.post("/api/schools", upload.single("image"), (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  const { name, address, city, state, contact, email_id } = req.body || {};
  const image = req.file ? req.file.filename : null;

  if (!name || !email_id) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const sql =
    "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [name, address, city, state, contact, email_id, image],
    (err, result) => {
      if (err) {
        console.error("❌ Database Error:", err);
        return res.status(500).json({ error: "Database error" });
      }
      res.status(200).json({ message: "School added successfully!" });
    }
  );
});

// Get all schools (GET)
app.get("/api/schools", (req, res) => {
  const sql = "SELECT * FROM schools";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Database Error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ---------------- Error Handling ----------------
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer-specific errors
    return res.status(400).json({ error: err.message });
  } else if (err) {
    // General errors
    return res.status(500).json({ error: err.message });
  }
  next();
});

// ---------------- Start Server ----------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
