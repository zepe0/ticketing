async function loadWorkers() {
  try {
    const response = await fetch("workers/workers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const workers = await response.json();
    return workers;
  } catch (error) {
    console.error("Error al cargar los trabajadores:", error);
    return [];
  }
}

async function loadTickets() {
  try {
    const response = await fetch("api/mytickets", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    const tickets = await response.json();
    return tickets;
  } catch (error) {
    console.error("Error al cargar los tickets:", error);
    return [];
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const workers = await loadWorkers();
    const tickets = await loadTickets();

    const userCards = document.querySelector(".users-container");

    workers.forEach((worker) => {
      const assignedTickets = tickets.filter(
        (ticket) => ticket.asignado === worker.uid
      );

      const totalTickets = assignedTickets.length;
      const openTickets = assignedTickets.filter(
        (ticket) => ticket.estado === "abierto"
      ).length;
      const closedTickets = totalTickets - openTickets;

      const completionPercentage = totalTickets
        ? Math.round((closedTickets / totalTickets) * 100)
        : 0;

      // Crear tarjeta de trabajador
      const userCard = document.createElement("div");
      userCard.classList.add("user-card");
      userCard.innerHTML = `
        <div class="user-card animate-in">
          <div class="user-header">
            <div class="user-avatar">
              <img src="${worker.avatar}" class="avatar">
            </div>
            <div class="user-info">
              <h3>${worker.nombre} ${worker.apellido}</h3>
              <span>Administración</span>
            </div>
          </div>
          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-value">${totalTickets}</div>
              <div class="stat-label">Total Tickets</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">${openTickets}</div>
              <div class="stat-label">Abiertos</div>
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${completionPercentage}%;"></div>
          </div>
          <div class="progress-stats">
            <span>Completados: ${closedTickets}</span>
            <span class="completion-rate">${completionPercentage}% completado</span>
          </div>
        </div>
      `;

      const progressFill = userCard.querySelector(".progress-fill");
      const completionRate = userCard.querySelector(".completion-rate");

      if (completionPercentage < 50) {
        progressFill.style.backgroundColor = "var(--warning)";
        completionRate.style.color = "var(--warning)";
      } else if (completionPercentage < 75) {
        progressFill.style.backgroundColor = "var(--secondary)";
        completionRate.style.color = "var(--secondary)";
      }

      userCard.addEventListener("click", function () {
        const TotalTiketsWorker = tickets.filter(
          (ticket) => ticket.asignado === worker.uid
        );
        const Listatickets = document.createElement("dialog");
        document.body.appendChild(Listatickets);
        Listatickets.showModal();
        Listatickets.classList.add("dialog");
        Listatickets.innerHTML = `  
        <button class="close-dialog">Cerrar</button>
        <div class="dialog-header">
              </div>
         `;
        const closeDialog = document.querySelector(".close-dialog");
        const renderlist = document.querySelector(".dialog-header");
        closeDialog.addEventListener("click", function (e) {
          if (e.target.matches(".close-dialog")) {
            document.querySelector(".dialog").remove();
          }
        });
        renderlist.innerHTML = TotalTiketsWorker.map((ticket) => {
          return `   
      <h3> ${ticket.uid} - ${ticket.titulo} ↔  ${ticket.estado}</h3>
     
    `;
        });
      });

      userCards.appendChild(userCard);
    });
  } catch (error) {
    console.error("Error al procesar los datos:", error);
  }
});
