export async function renderAlerts() {
    const alertsResponse = await fetch("./json/alerts.json");
    const alerts = await alertsResponse.json();
  
    if (alerts.length > 0) {
      const alertList = document.createElement("section");
      alertList.classList.add("alert-list");
  
      alerts.forEach(alert => {
        const alertElement = document.createElement("p");
        alertElement.textContent = alert.message;
        alertElement.style.backgroundColor = alert.background;
        alertElement.style.color = alert.color;
        alertList.appendChild(alertElement);
      });
  
      // Prepend alert list to the main element on the index page
      const mainElement = document.querySelector("main");
      mainElement.insertBefore(alertList, mainElement.firstChild);
    }
  }