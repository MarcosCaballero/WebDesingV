"use strict";

if (
  window.location.pathname === "/consults.html" ||
  window.location.pathname === "/WebDesingV/consults.html"
) {
  addEventListener("load", () => {
    fetch("https://web-design-c99l.onrender.com/")
      .then((res) => res.json())
      .then(({ data }) => fillTable(data));
  });
}

if (
  window.location.pathname === "/" ||
  window.location.pathname === "/index.html" ||
  window.location.pathname === "/WebDesingV/index.html" ||
  window.location.pathname === "/WebDesingV/"
) {
  addEventListener("load", () => {
    const form = document.getElementById("form-consult");
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      // Inhabilitar el botón de enviar
      const button = document.getElementById("button-create-consult");
      button.disabled = true;
      button.innerHTML = "Enviando...";
      // Enviar la consulta
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      fetch("https://web-design-c99l.onrender.com/", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then(({ data }) => {
          button.innerHTML = "Consulta enviada con exito!";
          setTimeout(() => {
            form.reset();
            button.disabled = false;
            button.innerHTML = "Enviar consulta";
          }, 3000);
        })
        .catch((err) => console.error(err));
    });
  });
}

function fillTable(data) {
  const table = document.getElementById("table-consults");
  const tbody = table.getElementsByTagName("tbody")[0];
  data.forEach((row) => {
    const tr = document.createElement("tr");
    const td_id = document.createElement("td");
    td_id.innerHTML = row.id_user;
    tr.appendChild(td_id);
    const td_username = document.createElement("td");
    td_username.innerHTML = row.username;
    tr.appendChild(td_username);
    const td_email = document.createElement("td");
    td_email.innerHTML = row.email;
    tr.appendChild(td_email);
    const td_phoneNumber = document.createElement("td");
    td_phoneNumber.innerHTML = row.phoneNumber;
    tr.appendChild(td_phoneNumber);
    const td_message = document.createElement("td");
    td_message.innerHTML = row.message;
    tr.appendChild(td_message);
    tbody.appendChild(tr);
  });
}
