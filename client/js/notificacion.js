function showNotification(title, message, type) {
  const notificationContainer = document.getElementById(
    "notification-container"
  );
  const notification = document.createElement("div");
  notification.classList.add("notification", type);
  notification.innerHTML = `<strong>${title}</strong>: ${message}`;
  notificationContainer.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 3000);
}
