const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/login";
}

if (JSON.parse(atob(token.split(".")[1])).rol == 1) {
  window.location.href = "/";
}
document.getElementById("nombre_trabajador").innerHTML = JSON.parse(
  atob(token.split(".")[1])
).email;

async function loadWorkers() {
  try {
    const response = await fetch("workers/mytickes", {
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
loadWorkers().then((tickets) => {
  const userCards = document.querySelector(".users-container");

  const assignedTickets = tickets;

  const totalTickets = assignedTickets.length;
  const openTickets = assignedTickets.filter(
    (ticket) => ticket.estado === "abierto"
  ).length;
  const closedTickets = totalTickets - openTickets;
  const completionPercentage = totalTickets
    ? Math.round((closedTickets / totalTickets) * 100)
    : 0;

  const userCard = document.createElement("div");
  userCard.classList.add("user-card");

  userCard.innerHTML = `
    <div class="user-card__header">
     
        <div class="user-card__info">
            <h2 class="user-card__name">${
              JSON.parse(atob(token.split(".")[1])).email
            }</h2>
            <p class="user-card__email">${
              JSON.parse(atob(token.split(".")[1])).email
            }</p>
        </div>
    </div>
    <div class="user-card__body">
        <div class="user-card__stats">
            <div class="user-card__stat">
                <h3 class="user-card__stat-title">Tickets totales</h3>
                <p class="user-card__stat-value">${totalTickets}</p>
            </div>
            <div class="user-card__stat">
                <h3 class="user-card__stat-title">Tickets abiertos</h3>
                <p class="user-card__stat-value">${openTickets}</p>
            </div>
            <div class="user-card__stat">
                <h3 class="user-card__stat-title">Tickets cerrados</h3>
                <p class="user-card__stat-value">${closedTickets}</p>
            </div>
            <div class="user-card__stat">
                <h3 class="user-card__stat-title">Porcentaje completado</h3>
                <p class="user-card__stat-value">${completionPercentage}%</p>
            </div>
            <div class="completion-rate"></div>
            <div class="progress-fill"></div>
            <div class="progress-fill-bar"></div>
        </div> 
    </div>
    `;
  userCards.appendChild(userCard);

  const progressFill = document.querySelector(".progress-fill");
  progressFill.style.width = `${completionPercentage}%`;
  progressFill.style.height = "3px";

  if (completionPercentage >= 50) {
    progressFill.style.backgroundColor = "var(--success)";
  } else {
    progressFill.style.backgroundColor = "var(--warning)";
  }
  if (completionPercentage >= 75) {
    progressFill.style.backgroundColor = "var(--secondary)";
  }

  const completionRate = document.querySelector(".completion-rate");
  completionRate.innerHTML = `${completionPercentage}% completado`;
  if (completionPercentage >= 50) {
    completionRate.style.color = "var(--success)";
  } else {
    completionRate.style.color = "var(--warning)";
  }
  tickets.map((ticket) => {
    const lista = document.getElementById("tickets");
    lista.innerHTML += `<li>${ticket.uid} - ${ticket.titulo} - ${ticket.estado}</li>`;
  });
});
