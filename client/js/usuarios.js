async function loadWorkers() {
  await fetch("workers/workers", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const users = data;
      const userCards = document.querySelector(".users-container");

      users.forEach((user) => {
        const userCard = document.createElement("div");
        userCard.classList.add("user-card");
        userCard.innerHTML = `
           <div class="user-card animate-in">
            <div class="user-header">
              <div class="user-avatar">
              <img src="${user.avatar} " class="avatar">
                 
              </div>
              <div class="user-info">
                <h3>${user.nombre} ${user.apellido}</h3>
                <span>Administración</span>
              </div>
            </div>
            <div class="user-stats">
              <div class="stat-item">
                <div class="stat-value">32</div>
                <div class="stat-label">Total Tickets</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">30</div>
                <div class="stat-label">Abiertos</div>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 82%"></div>
            </div>
            <div class="progress-stats">
              <span>Completados: 2</span>
              <span class="completion-rate">82% completado</span>
            </div>
          </div>
            `;
        userCards.appendChild(userCard);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
//TODO: Implementar la función loadTickets

document.addEventListener("DOMContentLoaded", function () {
  const workers = loadWorkers();

  const cards = document.querySelectorAll(".user-card");

  cards.forEach((card, index) => {
    const rate = document.querySelectorAll(".completion-rate");
    card.style.animationDelay = `${index * 0.1}s`;

    const totalTickets = parseInt(
      card.querySelector(".stat-value").textContent
    );
    const openTickets = parseInt(
      card.querySelectorAll(".stat-value")[1].textContent
    );
    const completedTickets = totalTickets - openTickets;

    const completionPercentage = Math.round(
      (completedTickets / totalTickets) * 100
    );

    const progressFill = card.querySelector(".progress-fill");
    progressFill.style.width = `${completionPercentage}%`;

    if (completionPercentage < 50) {
      rate[index].textContent = completionPercentage + "% completado";

      progressFill.style.backgroundColor = "var(--warning)";
      rate[index].style.color = "var(--warning)";
    } else if (completionPercentage < 75) {
      rate[index].textContent = completionPercentage + "% completado";
      progressFill.style.backgroundColor = "var(--secondary)";
      rate[index].style.color = "var(--secondary)";
    }

    card.addEventListener("click", function () {
      const userName = this.querySelector("h3").textContent;
      console.log(
        `Usuario: ${userName}, Porcentaje completado: ${completionPercentage}%`
      );
    });
  });
});
