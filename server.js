const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let students = [];

// Add student
app.post('/students', (req, res) => {
  const { name, roll } = req.body;
  if (!name || !roll) {
    return res.status(400).json({ error: "Name and Roll are required." });
  }
  students.push({ name, roll });
  res.json({ success: true });
});

// Get all students
app.get('/students', (req, res) => {
  res.json(students);
});

// Delete a student
app.delete('/students/:index', (req, res) => {
  const index = parseInt(req.params.index);
  if (index >= 0 && index < students.length) {
    students.splice(index, 1);
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Student not found." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
