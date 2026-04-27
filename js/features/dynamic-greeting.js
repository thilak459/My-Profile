document.addEventListener("DOMContentLoaded", () => {
    const greetingElement = document.getElementById("time-greeting");
    
    if (!greetingElement) return;

    const hour = new Date().getHours();
    let greeting = "";

    if (hour < 12) {
        greeting = "☀️ Good Morning";
    } else if (hour < 18) {
        greeting = "🌤️ Good Afternoon";
    } else {
        greeting = "🌙 Good Evening";
    }

    greetingElement.textContent = greeting;
});