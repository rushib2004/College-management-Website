const form = document.getElementById('studentForm');
const studentList = document.getElementById('studentList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const roll = document.getElementById('roll').value;

  await fetch('/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, roll })
  });

  form.reset();
  loadStudents();

  // Hide the footer after form submission
  const footer = document.getElementById('footer');
  footer.classList.remove('show');
});

async function loadStudents() {
  const res = await fetch('/students');
  const data = await res.json();

  studentList.innerHTML = '';
  data.forEach((student, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student.name}</td>
      <td>${student.roll}</td>
      <td><button class="done-btn" onclick="donestudent(${index})">Done</button></td>
      <td><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></td>
    `;
    studentList.appendChild(tr);
  });
}

async function deleteStudent(index) {
  const res = await fetch(`/students/${index}`, {
    method: 'DELETE'
  });

  if (res.ok) {
    loadStudents();
  } else {
    alert('Failed to delete student.');
  }
}

// Scroll event for showing footer (can remain as is for scrolling behavior)
form.addEventListener('scroll', function() {
  const footer = document.querySelector('footer');
  if (studentList.scrollHeight > window.innerHeight) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
});

// Initial load
loadStudents();
