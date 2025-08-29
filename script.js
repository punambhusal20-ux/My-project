// Global JS for all pages
document.addEventListener("DOMContentLoaded", () => {
  // ----- CONTACT FORM VALIDATION (index.html) -----
  const form = document.getElementById("contactForm");
  if (form) {
    const nameEl = document.getElementById("name");
    const emailEl = document.getElementById("email");
    const msgEl = document.getElementById("message");
    const msgCounter = document.getElementById("messageCounter");
    const formMsg = document.getElementById("formMsg");
    const MAX = 500;

    // Live character counter
    if (msgEl && msgCounter) {
      const updateCounter = () => {
        const len = msgEl.value.length;
        msgCounter.textContent = `${len} / ${MAX}`;
        msgCounter.className = len > MAX ? "text-danger text-end small" : "text-end small text-muted";
      };
      msgEl.addEventListener("input", updateCounter);
      updateCounter();
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = nameEl.value.trim();
      const email = emailEl.value.trim();
      const message = msgEl.value.trim();

      // Simple validations
      if (!name || !email || !message) {
        formMsg.textContent = "⚠️ All fields are required!";
        formMsg.className = "text-danger fw-bold";
        return;
      }

      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        formMsg.textContent = "⚠️ Invalid email format!";
        formMsg.className = "text-danger fw-bold";
        return;
      }

      if (message.length > MAX) {
        formMsg.textContent = `⚠️ Message is too long (${message.length}/${MAX}).`;
        formMsg.className = "text-danger fw-bold";
        return;
      }

      // Success
      formMsg.textContent = "✅ Form submitted successfully!";
      formMsg.className = "text-success fw-bold";
      form.reset();
      if (msgCounter) msgCounter.textContent = `0 / ${MAX}`;
    });
  }

  // ----- JS DEMO: BUTTON TEXT UPDATE (js.html) -----
  const demoBtn = document.getElementById("demoBtn");
  const demoText = document.getElementById("demoText");
  if (demoBtn && demoText) {
    demoBtn.addEventListener("click", () => {
      demoText.innerText = "🎉 Hello, JavaScript! You just clicked a button.";
    });
  }

  // ----- JS MINI APP: ADD ITEMS (js.html) -----
  const addItemForm = document.getElementById("addItemForm");
  const itemInput = document.getElementById("itemInput");
  const itemList = document.getElementById("itemList");

  if (addItemForm && itemInput && itemList) {
    addItemForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = itemInput.value.trim();
      if (!text) return;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";
      li.innerHTML = `
        <span>${escapeHtml(text)}</span>
        <button class="btn btn-sm btn-outline-danger">Remove</button>
      `;
      li.querySelector("button").addEventListener("click", () => li.remove());
      itemList.appendChild(li);
      itemInput.value = "";
      itemInput.focus();
    });
  }
});

// Small helper to avoid injecting HTML from the input
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[ch]));
}
