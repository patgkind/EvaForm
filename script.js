const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAvnEkO8T6f8O2ATbXLpwWXCnMgO4SYvvvswcgxz96sFl4PUmqXPucZlyfxNyaDnW1Ww/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evalForm");

  // Check if already submitted
  if (localStorage.getItem("evalSubmitted") === "true") {
    form.innerHTML = "<p style='text-align:center;font-size:16px;color:#80d8ff;'>You have already submitted this form. Thank you!</p>";
    return;
  }

  // Load student list and build form
  fetch("students.json")
    .then(res => res.json())
    .then(students => buildForm(students))
    .catch(err => {
      alert("Failed to load student list.");
      console.error(err);
    });

  // Handle form submission
  form.addEventListener("submit", function (e) {
    e.preventDefault();
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
      localStorage.setItem("evalSubmitted", "true");
      form.innerHTML = "<p style='text-align:center;font-size:16px;color:#80d8ff;'>Submission successful. Thank you!</p>";
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("Error submitting form.");
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evalForm");

  const isDev = new URLSearchParams(window.location.search).get("dev") === "1";

  if (!isDev && localStorage.getItem("evalSubmitted") === "true") {
    form.innerHTML = "<p style='text-align:center;font-size:16px;color:#80d8ff;'>You have already submitted this form. Thank you!</p>";
    return;
  }

  // continue loading students and form...
});
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
