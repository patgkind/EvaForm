const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwr8RTDWcKgRy-lgipS8-DnQ8dJC4owR4Oh22Vpy4iNE45V8K82IDK7l1adUfhXkPyeiQ/exec";
const isDev = new URLSearchParams(location.search).get("dev") === "1";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evalForm");
  if (!form) {
    console.error("evalForm not found");
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
    form.querySelectorAll("textarea").forEach(t => {
      data[t.name] = t.value.trim();
    });

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
        setTimeout(() => window.location.reload(), 800);
      })
      .catch(err => {
        console.warn("Direct submission error. Attempting fallback:", err);

        fetch(SCRIPT_URL)
          .then(res => res.json())
          .then(rows => {
            const match = rows.some(row =>
              Object.entries(data).every(([k, v]) => row[k] === v)
            );

            if (match) {
              alert("Submission confirmed (via fallback).");
              form.reset();
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
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwr8RTDWcKgRy-lgipS8-DnQ8dJC4owR4Oh22Vpy4iNE45V8K82IDK7l1adUfhXkPyeiQ/exec";
const isDev = new URLSearchParams(location.search).get("dev") === "1";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("evalForm");
  if (!form) {
    console.error("evalForm not found");
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
    form.querySelectorAll("textarea").forEach(t => {
      data[t.name] = t.value.trim();
    });

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
        setTimeout(() => window.location.reload(), 800);
      })
      .catch(err => {
        console.warn("Direct submission error. Attempting fallback:", err);

        fetch(SCRIPT_URL)
          .then(res => res.json())
          .then(rows => {
            const match = rows.some(row =>
              Object.entries(data).every(([k, v]) => row[k] === v)
            );

            if (match) {
              alert("Submission confirmed (via fallback).");
              form.reset();
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
