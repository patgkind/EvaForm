const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwr8RTDWcKgRy-lgipS8-DnQ8dJC4owR4Oh22Vpy4iNE45V8K82IDK7l1adUfhXkPyeiQ/exec"; // Replace with your URL
const isDev = new URLSearchParams(location.search).get("dev") === "1";

document.addEventListener("DOMContentLoaded", () => {
  fetch("students.json")
    .then(res => res.json())
    .then(students => buildForm(students))
    .catch(err => {
      alert("Failed to load student list.");
      console.error(err);
    });

  const form = document.getElementById("evalForm");

  if (!isDev && localStorage.getItem("evalSubmitted") === "true") {
    form.innerHTML = "<p style='text-align:center;font-size:16px;'>You have already submitted. Thank you!</p>";
    return;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {};
    form.querySelectorAll("textarea").forEach(t => data[t.name] = t.value.trim());

    fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data)
    })
    .then(res => {
      if (!res.ok) throw new Error("Submission failed");
      return res.text();
    })
    .then(() => {
      alert("Submission successful!");
        setTimeout(() => {
    window.location.reload();
  }, 800);
      if (!isDev) localStorage.setItem("evalSubmitted", "true");
    })
    .catch(err => {
      console.warn("Direct submission error. Attempting fallback:", err);

      // Fallback: check if data already saved in sheet
      fetch(SCRIPT_URL)
        .then(res => res.json())
        .then(rows => {
          const match = rows.some(row =>
            Object.entries(data).every(([key, value]) => row[key] === value)
          );

          if (match) {
            alert("Submission confirmed (via fallback).");
            form.reset();
            if (!isDev) localStorage.setItem("evalSubmitted", "true");
          } else {
            alert("Submission may have failed. Please try again.");
          }
        })
        .catch(err => {
          alert("Could not confirm submission. Try again later.");
          console.error("Fallback failed:", err);
        });
    });
  });
});

function buildForm(students) {
  const container = document.getElementById("formFields");
  students.forEach(s => {
    const div = document.createElement("div");
    div.className = "panel";
    div.innerHTML = `
      <label for="${s.key}">Evaluation for ${s.name}:</label>
      <textarea id="${s.key}" name="${s.key}" rows="3" required></textarea>
    `;
    container.appendChild(div);
  });
}
