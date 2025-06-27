const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzAvnEkO8T6f8O2ATbXLpwWXCnMgO4SYvvvswcgxz96sFl4PUmqXPucZlyfxNyaDnW1Ww/exec";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evalForm");
  const isDev = new URLSearchParams(window.location.search).get("dev") === "1";

  if (!isDev && localStorage.getItem("evalSubmitted") === "true") {
    form.innerHTML = "<p style='text-align:center;font-size:16px;color:#80d8ff;'>You have already submitted this form. Thank you!</p>";
    return;
  }

  fetch("students.json")
    .then(res => res.json())
    .then(students => buildForm(students))
    .catch(err => {
      alert("Failed to load student list.");
      console.error(err);
    });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const data = {};
    form.querySelectorAll("textarea").forEach(textarea => {
      data[textarea.name] = textarea.value.trim();
    });

    fetch(SCRIPT_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams(data)
    })
    .then(res => res.text())
    .then(() => {
      if (!isDev) localStorage.setItem("evalSubmitted", "true");
      form.innerHTML = "<p style='text-align:center;font-size:16px;color:#4caf50;'>Submission successful. Thank you!</p>";
    })
    .catch(err => {
      console.error("Submission error:", err);
      alert("Error submitting form. Please try again.");
    });
  });
});

function buildForm(students) {
  const formFields = document.getElementById("formFields");
  formFields.innerHTML = "";

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
