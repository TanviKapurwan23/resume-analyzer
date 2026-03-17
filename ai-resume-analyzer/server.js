const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

// File upload setup
const upload = multer({ dest: "uploads/" });

// Home route
app.get("/", (req, res) => {
  res.send("AI Resume Analyzer Server Running 🚀");
});

// Upload page
app.get("/upload", (req, res) => {
  res.send(`
    <h2>AI Resume Analyzer</h2>
    <form action="/analyze" method="post" enctype="multipart/form-data">
      <input type="file" name="resume" accept=".pdf" required/>
      <br><br>
      <button type="submit">Analyze Resume</button>
    </form>
  `);
});

// Analyze route
app.post("/analyze", upload.single("resume"), async (req, res) => {
  try {
    console.log("Step 1: Request received");

    if (!req.file) {
      console.log("❌ No file uploaded");
      return res.send("No file uploaded ❌");
    }

    console.log("Step 2: File uploaded");

    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);
    console.log("Step 3: File read");

    const pdfData = await pdfParse(dataBuffer);
    console.log("Step 4: PDF parsed");

    const resumeText = pdfData.text;
    console.log("Step 5: Text extracted");

    // MOCK AI RESPONSE (FREE)
    const feedback = `
<h3>🚀 Resume Analysis</h3>

<h4>✅ Strengths:</h4>
<ul>
  <li>Good structure</li>
  <li>Relevant experience mentioned</li>
</ul>

<h4>❌ Improvements:</h4>
<ul>
  <li>Add measurable achievements (numbers, impact)</li>
  <li>Improve project descriptions</li>
  <li>Use strong action verbs (built, optimized, scaled)</li>
  <li>Add ATS keywords (React, Node.js, APIs)</li>
</ul>

<h4>⭐ Tip:</h4>
<p>Customize your resume for each job.</p>
`;

    // Show result nicely
    res.json({
      score: Math.floor(Math.random() * 40) + 60, // 60–100 random score
      feedback: feedback,
    });
  } catch (err) {
    console.error("🔥 FULL ERROR:", err);
    res.status(500).send("Error analyzing resume ❌");
  }
});

// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001 🚀");
});
