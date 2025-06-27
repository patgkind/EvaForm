const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAvnEkO8T6f8O2ATbXLpwWXCnMgO4SYvvvswcgxz96sFl4PUmqXPucZlyfxNyaDnW1Ww/exec";

document.addEventListener("DOMContentLoaded", () => {
  // Load student list and build form
  fetch("students.json")
    .then(res => res.json())
    .then(buildForm)
    .catch(err => {
      alert("Failed to load student list.");
      console.error(err);
    });

  // Handle form submission
  document.getElementById("evalForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData();

    // Collect textarea values
    form.querySelectorAll("textarea").forEach(textarea => {
      formData.append(textarea.name, textarea.value.trim());
    });

    // Submit form data
    fetch(SCRIPT_URL, {
      method: "POST",
      body: formData
    })
    .then(res => res.text())
    .then(() => {
      alert("Submission successful!");
      form.reset();
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("Error submitting form.");
    });
  });
});

// Build the form dynamically from students.json
function buildForm(students) {
  const formFields = document.getElementById("formFields");

  students.forEach(student => {
    const div = document.createElement("div");
    div.className = "panel";
    div.innerHTML = `
      <label for="${student.key}">Evaluation for ${student.name}:</label>
      <textarea id="${student.key}" name="${student.key}" rows="3" required></textarea>
    `;
    formFields.appendChild(div);
  });
}
