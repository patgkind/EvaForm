const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyaeTsvT7EJP1cAnT5UkVhfGqPEup3YElleD6XjFRAcz5nlLUw6qEHmuqkZ-aKdaqbihw/exec";

document.addEventListener("DOMContentLoaded", () => {
  fetch("students.json")
    .then(res => res.json())
    .then(students => buildForm(students))
    .catch(err => {
      alert("Failed to load student list.");
      console.error(err);
    });

  document.getElementById("evalForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const form = e.target;
    const data = {};

    form.querySelectorAll("textarea").forEach(textarea => {
      data[textarea.name] = textarea.value.trim();
    });

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
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

function buildForm(students) {
  const formFields = document.getElementById("formFields");

  students.forEach(student => {
    const key = student.key;
    const displayName = student.name;

    const div = document.createElement("div");
    div.className = "panel";
    div.innerHTML = `
      <label for="${key}">Evaluation for ${displayName}:</label>
      <textarea id="${key}" name="${key}" rows="3" required></textarea>
    `;
    formFields.appendChild(div);
  });
}
